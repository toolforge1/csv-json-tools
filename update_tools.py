import os
import google.generativeai as genai

# API سیٹ اپ
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel('gemini-1.5-flash')

print("Starting SEO optimization for existing tools...")

# 1. پہلے موجودہ ٹولز کا تجزیہ کریں اور ایس ای او بہتر کریں
for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root or '.github' in root:
        continue
    for file in files:
        if file.endswith('.html') and file != 'index.html':
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                prompt = """You are an expert SEO specialist for developer tool websites. 
                Optimize the Meta Title, Description, Keywords, and heading tags of this tool page. 
                Keep all JavaScript, CSS, and core functionality 100% intact. Return ONLY the final updated valid HTML code without markdown codeblocks."""
                
                response = model.generate_content([prompt, content])
                if response and response.text:
                    clean_code = response.text.strip()
                    if clean_code.startswith('```html'):
                        clean_code = clean_code[7:]
                    if clean_code.endswith('```'):
                        clean_code = clean_code[:-3]
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(clean_code.strip())
                    print(f"Optimized: {file}")
            except Exception as e:
                print(f'Error on {file}: {e}')

print("Checking for new high-demand tool generation...")

# 2. مارکیٹ کا جائزہ لے کر نیا ٹول، مثالیں، آرٹیکل اور ہوم پیج اپڈیٹ کرنا
try:
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            home_content = f.read()

        new_tool_prompt = f"""
        Based on the current high-demand developer tools (like CSV/JSON utilities, formatting, conversion, or validation), suggest ONE new trending tool that is missing from this site.
        
        Return your response strictly in the following format (separated by '---SPLIT---'):
        
        [FILENAME]
        new-tool-name.html
        ---SPLIT---
        [HTML_CODE]
        (Complete, responsive, production-ready HTML file including the tool interface, JavaScript logic, working examples, an SEO-friendly explanatory article section at the bottom, and links back to the home page. Match the clean UI style of existing developer tool sites.)
        ---SPLIT---
        [INDEX_UPDATE]
        (Provide the exact HTML snippet for the card/link of this new tool that should be inserted into the home page index.html list.)
        """

        creation_response = model.generate_content([new_tool_prompt, home_content])
        if creation_response and creation_response.text:
            parts = creation_response.text.split('---SPLIT---')
            if len(parts) >= 3:
                filename = parts[0].replace('[FILENAME]', '').strip()
                html_code = parts[1].replace('[HTML_CODE]', '').strip()
                index_snippet = parts[2].replace('[INDEX_UPDATE]', '').strip()

                if html_code.startswith('```html'):
                    html_code = html_code[7:]
                if html_code.endswith('```'):
                    html_code = html_code[:-3]

                if not filename.endswith('.html'):
                    filename += '.html'
                
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(html_code.strip())
                print(f"New Tool Created Successfully: {filename}")

                updated_home = home_content.replace('</body>', f'\n<!-- AI Auto Added Tool -->\n{index_snippet}\n</body>')
                with open('index.html', 'w', encoding='utf-8') as f:
                    f.write(updated_home)
                print("Home page updated with the new tool!")
except Exception as e:
    print(f"Error in creating new tool: {e}")
  
