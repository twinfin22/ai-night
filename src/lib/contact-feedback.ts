export function contactFailureMessage(status: number, retryAfter: string | null) {
  const seconds = retryAfter && /^[1-9]\d*$/.test(retryAfter) ? Number(retryAfter) : 0;
  if (status === 429) {
    const wait = Number.isSafeInteger(seconds) && seconds > 0 && seconds <= 86_400 ? `${Math.ceil(seconds / 60)}분 후` : '잠시 후';
    return `문의가 많아 잠시 쉬고 있어요. ${wait} 다시 보내주세요. 입력 내용은 유지됩니다. hello@ai-night.study 로 직접 보내셔도 됩니다.`;
  }
  if (status === 503) return '문의 전송을 잠시 이용할 수 없습니다. 잠시 후 다시 보내주세요. 입력 내용은 유지됩니다. hello@ai-night.study 로 직접 보내셔도 됩니다.';
  return '전송에 실패했습니다. 잠시 후 다시 시도하거나 hello@ai-night.study 로 직접 보내주세요.';
}
