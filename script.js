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