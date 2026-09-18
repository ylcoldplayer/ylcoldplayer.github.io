// MathJax 3 configuration for the blog.
//
// Enables TeX dollar-sign delimiters ($...$ inline, $$...$$ display) in
// addition to the \( \) and \[ \] forms, AMS equation numbering, and
// \label / \eqref cross-references within a post.
//
// Load this file BEFORE the MathJax bundle:
//   <script src="math.js"></script>
//   <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>

window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
        tags: 'ams',
        packages: { '[+]': ['ams', 'newcommand', 'configmacros', 'boldsymbol'] },
        macros: {
            R: '{\\mathbb{R}}',
            N: '{\\mathbb{N}}',
            E: '{\\mathbb{E}}',
            P: '{\\mathbb{P}}',
            argmax: '{\\operatorname*{arg\\,max}}',
            argmin: '{\\operatorname*{arg\\,min}}',
            eps: '{\\varepsilon}',
            norm: ['{\\left\\lVert #1 \\right\\rVert}', 1],
            abs: ['{\\left\\lvert #1 \\right\\rvert}', 1],
            set: ['{\\left\\{ #1 \\right\\}}', 1]
        }
    },
    chtml: {
        scale: 1.05,
        matchFontHeight: false
    },
    options: {
        // Never typeset inside code samples.
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        ignoreHtmlClass: 'no-mathjax'
    }
};
