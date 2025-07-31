import { TIEMPO_SEC } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, upLoadData = undefined) {
  try{
    const fetchGet = upLoadData
    ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upLoadData),
    })
    : fetch(url);

     const res = await Promise.race([fetchGet, timeout(TIEMPO_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;


  } catch (err) {
    throw err;
  }
}

/*export const GET_JSON = async function (url) {
  try {
    const fetchGet = fetch(url);
    const res = await Promise.race([fetchGet, timeout(TIEMPO_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const SEND_JSON = async function (url, upLoadData) {
  try {
    const fetchSend = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upLoadData),
    });
    const res = await Promise.race([fetchSend, timeout(TIEMPO_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};*/
