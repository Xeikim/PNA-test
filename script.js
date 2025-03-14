// client-side js, loaded by index.html
// run by the browser each time the page is loaded

const fetchInputBox = document.getElementById("fetch-input-box");
const fetchMethod = document.getElementById("fetch-method");
const fetchCors = document.getElementById("fetch-cors");
const fetchTargetAddressSpace = document.getElementById(
  "fetch-target-address-space"
);
const fetchForm = document.getElementById("fetch-form");
const resultList = document.getElementById("fetch-results-list");
// const useServiceWorker = document.getElementById("service-worker");
const fetchHeaders = document.getElementById("fetch-headers");
const fetchBody = document.getElementById("fetch-body");

function appendResult(url, result) {
  const text = `${url}: ${result}`;
  const item = document.createElement("li");
  item.appendChild(document.createTextNode(text));
  resultList.appendChild(item);
}

function tryFetch(url, options) {
  console.log(JSON.stringify(options));
  return fetch(url, options)
    .then((response) => {
      appendResult(url, `response received`);
    })
    .catch((error) => {
      appendResult(url, `error = ${error}`);
    });
}

function tryFetchAll(urlList) {
  const fetches = [];
  for (const url of urlList) {
    fetches.push(tryFetch(url));
  }
  return Promise.all(fetches);
}

function generateUrls() {
  const port = 1234;
  const urls = ["http://localhost"];
  for (let i = 1; i < 255; i++) {
    urls.push(`https://192.168.1.${i}`);
  }
  return urls;
}

// tryFetchAll(generateUrls());

fetchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!fetchInputBox.validity.valid) {
    return;
  }
  // if (useServiceWorker) {
  //   (async function () {
  //     const registration = await navigator.serviceWorker.register(
  //       "service-worker.js"
  //     );
  //     console.log({ registration: registration.active });
  //   })();
  // } else {
  //   (async function () {
  //     const registration = await navigator.serviceWorker
  //       .getRegistrations()
  //       .then(function (registrations) {
  //         for (let registration of registrations) {
  //           registration.unregister();
  //           console.log({ registration: registration.active });
  //         }
  //       });
  //   })();
  // }
  let fetchOptions = {
      method: fetchMethod.value,
      mode: fetchCors.checked ? "cors" : "no-cors",
    };
//   if (fetchTargetAddressSpace.value != "n/a") {
//     fetchOptions["targetAddressSpace"] = fetchTargetAddressSpace.value;
//   }
  if (fetchMethod.value == "POST") {
    fetchOptions["body"] = fetchBody.value;
  }
  if (fetchHeaders.value) {
    fetchOptions["headers"] = new Headers(JSON.parse(fetchHeaders.value));
  }
  tryFetch(fetchInputBox.value, fetchOptions);
});


//   request = fetch(
//         'http://192.168.1.246/cgi-bin/epos/service.cgi?devid=local_printer&timeout=60000',
//         {
//             headers: new Headers({
//               'Accept-Encoding': 'gzip, deflate',
// //            'Content-Type': 'text/xml',
// //            'Host': 'device.local',
// //            'Authorization': 'Basic dGVzdDp0ZXN0',
//               'Origin': 'https://riccardo.bastianini.me',
//             }),
//             targetAddressSpace: 'private',
//             credentials: 'omit',
//             cache: 'no-cache',
//             mode: 'cors',
//             method: 'POST',
//             body: '<?xml version="1.0" encoding="UTF-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>'
//         }
//     );
//   request.then((s) => s.text().then(console.log));

// 视频播放器控制逻辑
// 获取视频相关元素
const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

// 格式化时间函数
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 播放/暂停控制
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '暂停';
    } else {
        video.pause();
        playPauseBtn.textContent = '播放';
    }
});

// 视频加载完成后设置进度条最大值
video.addEventListener('loadedmetadata', () => {
    progressBar.max = Math.floor(video.duration);
    durationSpan.textContent = formatTime(video.duration);
});

// 更新进度条和时间显示
video.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(video.currentTime);
    currentTimeSpan.textContent = formatTime(video.currentTime);
});

// 进度条拖动控制
progressBar.addEventListener('input', () => {
    video.currentTime = progressBar.value;
});

// 视频结束时重置按钮状态
video.addEventListener('ended', () => {
    playPauseBtn.textContent = '播放';
});

// 处理视频错误
video.addEventListener('error', () => {
    console.error('视频加载错误:', video.error);
});