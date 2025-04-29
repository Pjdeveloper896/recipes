const helloMessage: string = `<div class="card">
<div class="card-item" id="containersd"> <h1 class='title'>recipes</h1></div>
</div>`;

 export function displayHello(): void {
    // Create a div element to hold the hello message
    const divElement = document.createElement('div');
    divElement.innerHTML = helloMessage;
    document.body.appendChild(divElement);
    console.log("hello");
}