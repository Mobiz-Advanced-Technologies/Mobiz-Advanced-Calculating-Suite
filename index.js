function stringGen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function spawnwindow(name, URL, icon, height, width) {
    //configure elements
    var section = document.getElementById("section");
    var footer = document.getElementById("footer1");
    var window = document.createElement("div");
    var header = document.createElement("div");
    var content = document.createElement("div");
    var webview = document.createElement("iframe");
    var minimized = document.createElement("button");
    var close = document.createElement("button");
    var minimize = document.createElement("button");
    var appID = stringGen()

    //create window
    window.classList.add('window');
    window.id = name + appID;
    window.style.display = "block";
    window.onclick = function () {
        focusWindow(window)
    }

    //create header
    header.classList.add('header');
    header.style.width = width;
    header.innerHTML = "<button class='headertext'>" + name + "</button>";

    //create close button
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    close.classList.add('closebutton');
    close.onclick = function () {
        window.remove();
        minimized.remove();
    }

    //create minimize button
    minimize.innerHTML = '<i class="fa-solid fa-window-minimize"></i>';
    minimize.classList.add('minimize');
    minimize.onclick = function () {
        window.style.display = "none"
        minimized.className = "menubuttonminimized"
    }

    //create content div
    content.classList.add('content');

    //create webview
    webview.style.height = height;
    webview.style.width = width;
    webview.src = URL;
    webview.setAttribute("webpreferences", "contextIsolation=false");
    webview.setAttribute("nodeintegration", "");
    // webview.addEventListener('did-finish-load', function () {
    //     webview.openDevTools()
    // });

    //create minimized icon
    minimized.innerHTML = "<i class='" + icon + "''></i>";
    minimized.className = "menubuttonminimized menubuttonminimizing"
    minimized.onclick = function () {
        window.style.display = "block"
        minimized.className = "menubuttonminimized menubuttonminimizing"
    }

    //append the elements
    section.prepend(window);
    window.appendChild(header);
    header.appendChild(close);
    header.appendChild(minimize)
    window.appendChild(content);
    content.appendChild(webview);
    footer.appendChild(minimized);

    //make the window draggable
    $(".window").draggable({
        handle: ".header",
        containment: "#body",
        opacity: 0.75
    });
}

function focusWindow(windowElem) {
  const windows = document.querySelectorAll('.window');
  windows.forEach((elem) => elem.classList.remove('focused'));

  windowElem.classList.add('focused');
}