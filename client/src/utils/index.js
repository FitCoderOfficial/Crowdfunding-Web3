

//남은 일수 계산
export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  

//기부금을 백분율로 계산 
export const calculateBarPercentage = (goal, raisedAmount) => {
const percentage = Math.round((raisedAmount * 100) / goal);

return percentage;
};

//이미지맞는지 확인
export const checkIfImage = (url, callback) => {
const img = new Image();
img.src = url;

if (img.complete) callback(true);

img.onload = () => callback(true);
img.onerror = () => callback(false);
};