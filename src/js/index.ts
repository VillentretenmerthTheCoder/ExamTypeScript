import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IBid{
    id : number,
    item: string,
    bidd : number,
    name : string
}

//url for the rest webservice at Azure
let URI: string = "https://restservice20191104123408.azurewebsites.net/api/Bids";

//create a click eventlistener at "Add" button
let AddBidToListButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddBidToListButton.addEventListener('click',addBid);

let GetBidButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
GetBidButton.addEventListener('click',getAllBids);

let GetBidByIdButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getById");
GetBidByIdButton.addEventListener('click',GetBidById);

let DeleteBidByIdButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("DeleteById");
DeleteBidByIdButton.addEventListener('click',DeleteBidById);

let PutBidButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("putButton");
PutBidButton.addEventListener('click',PutaBid);


function EmptyRow():void
{
    var table:HTMLTableElement = <HTMLTableElement>document.getElementById("table")
    let row1 = table.insertRow(1)
    let celly = row1.insertCell(0)
        let celly1 = row1.insertCell(1)
        let celly2 = row1.insertCell(2)
        let celly3 = row1.insertCell(3)
                
        celly.innerHTML = "--------"
        celly1.innerHTML = "----------------------"
        celly2.innerHTML = "---------"
        celly3.innerHTML = "------------------------";

}


function PopulateTable(id:number, item:string, bid:number, name:string):void
    {
        var table:HTMLTableElement = <HTMLTableElement>document.getElementById("table")
        
        let row1 = table.insertRow(1)
    
        let celly = row1.insertCell(0)
        let celly1 = row1.insertCell(1)
        let celly2 = row1.insertCell(2)
        let celly3 = row1.insertCell(3)
                
        celly.innerHTML = id.toString();
        celly1.innerHTML = item;
        celly2.innerHTML = bid.toString();
        celly3.innerHTML = name;
       
    }

    function addBid():void
        {
        let inputName:string = (<HTMLInputElement>document.getElementById("addName")).value;
        let inputItem:string = (<HTMLInputElement>document.getElementById("addItem")).value;
        let inputBid:HTMLInputElement =(<HTMLInputElement>document.getElementById("addBid"));
        let inputId:HTMLInputElement = (<HTMLInputElement>document.getElementById("addId"));

        axios.post<IBid>(URI,{id:inputId.value,item:inputItem,bidd:inputBid.value,name:inputName})
        .then(function(response: AxiosResponse){
            console.log("Response "+ response.status +" "+ response.statusText)})
        .catch(function(responseError:AxiosError){
            console.log(responseError)
        });
        }

    function getAllBids():void
    {
        EmptyRow(); 
        axios.get<IBid[]>(URI)
        .then(function(response:AxiosResponse<IBid[]>){
            response.data.forEach((eachBid:IBid) => {
               PopulateTable(eachBid.id,eachBid.item,eachBid.bidd,eachBid.name)
            });
        })
        .catch(function(error:AxiosError){
            console.log(error)
        });    
    }

    function GetBidById():void
        {
            EmptyRow();
            let inputId:HTMLInputElement = (<HTMLInputElement>document.getElementById("addId"));
            axios.get<IBid>(URI+"/"+inputId.value)
            .then(function(response:AxiosResponse<IBid>){
                PopulateTable(response.data.id,response.data.item,response.data.bidd,response.data.name)
            })
            .catch(function(error:AxiosError){
                console.log(error);   
            })
        }



    function DeleteBidById():void
        {
            let inputId:HTMLInputElement = (<HTMLInputElement>document.getElementById("addId"));
        
            axios.delete<IBid>(URI+"/"+inputId.value)
            .then(function(response:AxiosResponse){
                console.log("Response:"+response.status+" "+response.statusText)
            })
            .catch(function(error:AxiosError){
                console.log(error)
            })
        }


    function PutaBid():void
        {
      
            let inputName:string = (<HTMLInputElement>document.getElementById("addName")).value;
            let inputItem:string = (<HTMLInputElement>document.getElementById("addItem")).value;
            let inputBid:HTMLInputElement =(<HTMLInputElement>document.getElementById("addBid"));
            let inputId:HTMLInputElement = (<HTMLInputElement>document.getElementById("addId"));
            let inputNewId:HTMLInputElement = (<HTMLInputElement>document.getElementById("addNewID"));

            axios.put(URI+"/"+inputId.value,{id:inputNewId.value, item:inputItem, bid:inputBid.value, name:inputName})
            .then(function(response:AxiosResponse){
                console.log("Response: "+response.status+" "+response.statusText)
            })
            .catch(function(error:AxiosError){
                console.log(error)
            })
        }


    
