export function generateStarHTML(isFull) {
    const color = isFull ? '#FEB524' : '#E2E2E2';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
        <path fill="${color}" d="M5.258-17.164a.568.568,0,0,1,.327-.3.637.637,0,0,1,.43,0,.568.568,0,0,1,.327.3L7.556-14.7l2.729.392a.567.567,0,0,1,.383.224.624.624,0,0,1,.131.411.574.574,0,0,1-.178.392L8.64-11.351l.467,2.729a.59.59,0,0,1-.084.421.549.549,0,0,1-.346.252.576.576,0,0,1-.43-.056L5.8-9.277,3.351-8.006a.576.576,0,0,1-.43.056A.549.549,0,0,1,2.576-8.2a.59.59,0,0,1-.084-.421l.467-2.729L.978-13.276A.574.574,0,0,1,.8-13.669a.624.624,0,0,1,.131-.411.567.567,0,0,1,.383-.224L4.043-14.7Z" transform="translate(-0.8 17.5)"/>
    </svg>`;
}

export function generateStarsHTML(rating) {
    return Array.from({ length: 5 }, (_, i) => generateStarHTML(i < Math.floor(rating))).join('');
}