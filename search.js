  const xor = {
    encode(str) {
      if (!str) return str;
      return encodeURIComponent(
        str
        .toString()
        .split('')
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
        )
        .join('')
      );
    },
    decode(str) {
      if (!str) return str;
      let [input, ...search] = str.split('?');
      return (
        decodeURIComponent(input)
        .split('')
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
        )
        .join('') + (search.length ? '?' + search.join('?') : '')
      );
    },
  };

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function skibidi(query) {
    const skibidiPattern = /^skibidi\{(.+)\}$/;
    const match = query.match(skibidiPattern);

    if (match) {
      const content = match[1];
      const encodedContent = xor.encode(content);
      const iframeUrl = 'https://edgedcircles.com/uv/service/' + encodedContent;
      const newWindow = window.open('about:blank', '_blank');
      const iframe = `<iframe src="${iframeUrl}" width="100%" height="100%"></iframe>`;
      newWindow.document.write(iframe);
    }
  }

  function processQuery() {
    const query = getQueryParam('q');
    if (query) {
      skibidi(query);

      if (!/^skibidi\{.+\}$/.test(query)) {
        const scratchUrl = `https://scratch.mit.edu/search/projects?q=${encodeURIComponent(query)}`;
        window.location.href = scratchUrl;
      }
    }
  }

  window.onload = processQuery;