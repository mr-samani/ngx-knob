export function getOffsetPosition(evt: MouseEvent | TouchEvent, parent: HTMLElement) {
  if (evt instanceof MouseEvent) {
    return {
      x: evt.offsetX,
      y: evt.offsetY,
    };
  }
  var position = {
    x: evt.targetTouches ? evt.targetTouches[0].pageX : evt.touches[0].clientX,
    y: evt.targetTouches ? evt.targetTouches[0].pageY : evt.touches[0].clientY,
  };

  while (parent.offsetParent) {
    position.x -= parent.offsetLeft - parent.scrollLeft;
    position.y -= parent.offsetTop - parent.scrollTop;

    parent = parent.offsetParent as any;
  }

  return position;
}

export function convertValueToDegree(value: number, min: number, max: number) {
  // محاسبه درصد مقدار در محدوده min و max
  const percentage = (value - min) / (max - min);

  // تبدیل درصد به درجه (0 تا 360)
  const degree = percentage * 360;
  return degree;
}

export function convertDegreeToValue(degree: number, min: number, max: number) {
  // تبدیل درجه ورودی به بازه -150 تا 150 درجه
  // درجه‌ها در بازه 0 تا 360 می‌باشند و باید به بازه -150 تا 150 مبدل شوند
  degree =150- degree ;
  //   if (degree < -150) degree += 360;
  //   if (degree > 150) degree -= 360;
  if (degree < 0) degree -=300 ;
  // محاسبه درصد درجه در محدوده -150 تا 150
  const range = 300; // بازه -150 تا 150 برابر با 300 درجه
  const percentage = (degree + 150) / range;

  // تبدیل درصد به مقدار در محدوده min و max
  const value = min + percentage * (max - min);

  return Math.abs(value);
}
