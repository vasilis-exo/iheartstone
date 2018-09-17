export function sayswho(): string {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) { return tem.slice(1).join(' ').replace('OPR', 'Opera'); }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }

  return M.join(' ');
}

export function isNotIE11(): boolean {
  // console.log('isNotIE11');
  const browserVersion = this.sayswho();
  return !browserVersion.includes('IE');
}

export function convertURLParamsToObject(url: string): any {

  const params = url.split('&').reduce(function (prev, curr, i, arr) {
    const p = curr.split('=');
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
    return prev;
  }, {});

  return params;
}
