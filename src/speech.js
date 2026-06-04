function getVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };

    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 500);
  });
}

function findThaiVoice(voices) {
  return voices.find((voice) => voice.lang?.toLowerCase().startsWith("th"));
}

export async function speakThai(text) {
  if (!text?.trim()) {
    return;
  }

  if (!("speechSynthesis" in window)) {
    alert("這個瀏覽器目前不支援語音朗讀。");
    return;
  }

  const voices = await getVoices();
  const thaiVoice = findThaiVoice(voices);

  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  if (thaiVoice) {
    utterance.voice = thaiVoice;
  }

  utterance.onerror = () => {
    alert("播放失敗。請確認瀏覽器或 Windows 已安裝可用語音，並且網站分頁沒有被靜音。");
  };

  window.speechSynthesis.speak(utterance);
}

export function playAudioFile(audioUrl) {
  if (!audioUrl?.trim()) {
    return false;
  }

  const audio = new Audio(audioUrl);
  audio.play().catch(() => {
    alert("音檔播放失敗。請確認音檔路徑正確，並且瀏覽器沒有封鎖音訊。");
  });

  return true;
}

export function playThaiAudio({ audio, text }) {
  if (playAudioFile(audio)) {
    return;
  }

  if (!text?.trim()) {
    alert("這筆資料沒有可播放的泰文內容。");
    return;
  }

  alert("這筆資料尚未設定音檔。請先在老師後台填入 /audio/...mp3 路徑。");
}
