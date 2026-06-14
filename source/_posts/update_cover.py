import os
import re
import yaml

# 遍历当前目录下所有.md文件
for filename in os.listdir('.'):
    if filename.endswith('.md'):
        filepath = os.path.join('.', filename)
        
        # 读取文件内容
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 使用正则表达式匹配front matter
        front_matter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
        
        if front_matter_match:
            front_matter_raw = front_matter_match.group(1)
            
            # 解析YAML格式的front matter
            try:
                front_matter = yaml.safe_load(front_matter_raw)
            except yaml.YAMLError as e:
                print(f"Error parsing YAML in {filename}: {e}")
                continue
            
            # 检查是否存在cover字段
            if 'cover' not in front_matter and 'index_img' in front_matter:
                # 添加cover字段，值为index_img的值
                front_matter['cover'] = front_matter['index_img']
                
                # 将更新后的front matter转换回YAML格式
                updated_front_matter_raw = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True).strip()
                
                # 替换原来的front matter
                updated_content = content.replace(front_matter_raw, updated_front_matter_raw)
                
                # 写回文件
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                
                print(f"Updated {filename}")
            else:
                print(f"No changes needed for {filename}")
        else:
            print(f"No front matter found in {filename}")