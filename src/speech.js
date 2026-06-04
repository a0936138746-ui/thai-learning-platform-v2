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
    alert("這個瀏覽器不支援語音播放。");
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
    alert("語音播放失敗。之後建議改用固定音檔，品質會比較穩定。");
  };

  window.speechSynthesis.speak(utterance);
}

export function playAudioFile(audioUrl) {
  if (!audioUrl?.trim()) {
    return false;
  }

  const audio = new Audio(audioUrl);
  audio.play().catch(() => {
    alert("音檔播放失敗，請確認音檔路徑是否正確。");
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
