function wget(url, method, callback, params=null) {
    var obj;
    try {
        obj = new XMLHttpRequest();
    } catch (e) {
        try {
            obj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                obj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser does not support Ajax.");
                return false;
            }
        }
    }
    obj.onreadystatechange = function() {
        if (obj.readyState == 4) {
            callback(obj);
        }
    }
    obj.open(method, url, true);
    obj.send(params);
    return obj;
}
var code_content = `
<!DOCTYPE html>
<html>
  <head>
    <title>Untitled Document
    </title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      /* CSS code here */
    </style>
    <script language="javascript">
      // Javascript code here
    </script>
  </head>
  <body>
    <!-- HTML code here -->
    <p>Chào mừng bạn đến với 
      <a href="https://nguyenvanhieu.vn">Lập Trình Không Khó
      </a>
    </p>
  </body>
</html>
`;

function retrieveSource() {
    try {
        let home_url = "https://nguyenvanhieu.vn/"
        let paras = window.location.href.replace(/^.+?\?url=/i, "").split("&idx=");
        var post_id = paras[0];
        var index = parseInt(paras[1]);
        var data = wget(home_url + post_id, 'get', function(obj) {
            parser = new DOMParser();
            var doc = parser.parseFromString(obj.responseText, "text/html");
            code_element = doc.getElementsByClassName('crayon-code')[index - 1];
            if (code_element) {
                code_content = code_element.innerText.replace(/(\u00a0|&nbsp;)/g, " ");
                title_el = document.getElementsByTagName("h1")[0];
                title_el.innerHTML = "<span>Bài học: </span><a href=\"" + home_url + post_id + "\">" + doc.title;
                +"</a>";
            }
            editor.setValue(code_content);
            codeBeauty();
            document.querySelector('.CodeMirror.cm-s-default').classList.add('col-lg-6', 'col-md-6', 'col-sm-12', 'col-xs-12');
            document.querySelector('body').style.visibility = 'visible';

        });
    } catch (err) {// console.log(err);
    }
}

retrieveSource();

document.getElementById("restore").onclick = function() {
    if (code_content) {
        editor.setValue(code_content);
        codeBeauty();
    }
}
;

document.getElementById("format").onclick = function() {
    codeBeauty();
}
;

document.getElementById("zoom").onclick = function() {
    var left = document.getElementsByClassName('CodeMirror')[0];
    var right = document.getElementById('preview');
    if (left.classList.contains('zoomon')) {
        left.classList.remove('zoomon');
        right.classList.remove('zoomon');
        document.querySelector('#zoom span').innerHTML = 'Phóng to';
    } else {
        left.classList.add('zoomon');
        right.classList.add('zoomon');
        document.querySelector('#zoom span').innerHTML = 'Thu nhỏ';
    }
}
;

function codeBeauty() {
    var totalLines = editor.lineCount();
    editor.autoFormatRange({
        line: 0,
        ch: 0
    }, {
        line: totalLines
    });
}

var delay;

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "text/html",
    extraKeys: {"Ctrl-Space": "autocomplete"},
    lineNumbers: true,
    lineWrapping: false,
    autoCloseBrackets: true,
    matchBrackets: true,
    tabSize: 2
});

editor.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
});

function updatePreview() {
    var previewFrame = document.getElementById("preview");
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(editor.getValue());
    preview.close();
}
setTimeout(updatePreview, 300);

