// scripts/callouts.js (改进版)

hexo.extend.filter.register('marked:renderer', function(renderer) {
  const originalBlockquote = renderer.blockquote;
  
  renderer.blockquote = function(quote) {
    // 更复杂的Callouts匹配正则表达式
    const calloutRegex = /^>\s*\[!(\w+)(?:\s*([^\n]*?))?\]\s*(?:\n((?:>.*\n?)*)|$)/gm;
    
    if (calloutRegex.test(quote)) {
      quote = quote.replace(calloutRegex, (match, type, title, content) => {
        // 处理内容
        let cleanContent = '';
        if (content) {
          cleanContent = content.replace(/^>\s?/gm, '');
        }
        
        const calloutType = type.toLowerCase();
        const calloutTitle = title || type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        
        return `<div class="callout callout-${calloutType}">
  <div class="callout-title">${calloutTitle}</div>
  <div class="callout-content">${cleanContent}</div>
</div>`;
      });
      
      return quote;
    }
    
    if (typeof originalBlockquote === 'function') {
      return originalBlockquote.call(this, quote);
    }

    return `<blockquote>${quote}</blockquote>`;
  };
});
