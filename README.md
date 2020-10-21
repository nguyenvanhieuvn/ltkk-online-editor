
## WP JS inclue
```
/* Add JS for online editor */

function create_demo_url() {
    ?>
      if (is_singular()) {
        <script>
            var postId = window.location.href.replace(/^.*nguyenvanhieu.vn/i, "").replace(/\/[?&].*/i, "").replace(/\//g, '');
            var demos = document.querySelectorAll('.ltkk-demo a');
            for (x of demos) {
                    let idx = x.getAttribute('data-idx');
                let url = "https://nguyenvanhieu.vn/editor/?url=" + postId + "&idx=" + idx;
                x.href = url;
            }
        </script>
    }
    <?php
}
add_action('wp_footer', 'create_demo_url');

```
