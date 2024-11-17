import { BaseComponent } from "../BaseComponent/BaseComponent.js";
export class Search extends BaseComponent{
    constructor(){
        super();
        this.loadCSS('Search');
    }
    render(){
        const container = document.createElement("div");
        container.classList.add("container");
        const searchBar = document.createElement("div");
        searchBar.classList.add("bar");
        const filter = document.createElement("div");
        filter.classList.add("find");
        const feed = document.createElement("div");
        const bar = document.createElement("input");
        bar.classList.add("search-bar");
        bar.type="text";
        bar.placeholder = "Search events";
        filter.innerHTML=
        `<div><input type="checkbox" name="Cultural" id="culture"><label for="culture">Cultural</label></div>
        <div><input type="checkbox" name="Religious" id="religion"><label for="religion">Religious</label></div>
        <div><input type="checkbox" name="Community-Building" id="comB"><label for="comB">Community-Building</label></div>
        <div><input type="checkbox" name="Party" id="party"><label for="party">Party</label></div>
        <div><input type="checkbox" name="Academic" id="acad"><label for="acad">Academic</label></div>
        <div><input type="checkbox" name="Other/Misc" id="misc"><label for="misc">Other</label></div>`;
        searchBar.appendChild(bar);
        
        // container.appendChild(searchBar);
        container.appendChild(filter);
        container.appendChild(feed);
        const docHeader = document.getElementById("viewContainer");
        docHeader.appendChild(container);
        const actualHeader = document.getElementById("header");
        const nav = document.querySelector(".nav-bar");
        actualHeader.insertBefore(searchBar, nav);
        return container;
    }

    
}