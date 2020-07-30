
// var str="bid0=Basic&tr0=#,VLL,VLN,A,V_phase_angle,A_phase_angle,VTHD_V,_ATHD,K_factor_V,K_factor_A&tr1=Avg,0.0000000,0.0000000,0.0000000&tr2=R(V),0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000&tr3=Y(B),0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000&tr4=B(R),0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000&tr5=Frequency,0.0000000&tr6=RPM,0.0000000&bid1=Power&tr0,#,Watts,VA,VAR,PF&tr1=Total,0.0000000,0.0000000,0.0000000,0.0000000&tr2=R,0.0000000,0.0000000,0.0000000,0.0000000&tr3=Y,0.0000000,0.0000000,0.0000000,0.0000000&tr4=B,0.0000000,0.0000000,0.0000000,0.0000000&";
// debugger;
 //var tabletag=document.querySelector('div');
// var scrapeddata=getData(str);
//   appendToTable(scrapeddata);
var str="";
var tabletag=document.querySelector('div');

function getData(str){
    var arr=str.split('&');
    var mainarry=[];
    var temparray=[]
    console.log('hi');
    //devide the string as group
    for(var i=0;i<arr.length;i++){
        if(arr[i].startsWith('bid')){
            if(temparray.length>0){
        mainarry.push(temparray);
        temparray=[];
            }
        }else if(i==arr.length-1){
            temparray.push(arr[i]);
            mainarry.push(temparray)
        }else{
            temparray.push(arr[i]);
        }
        }
        //create a class
    class tabledata{
        header="";
        tds=[];
    }
    //map the td values and header
    var finalarray=[];
    mainarry.forEach(index=>
        {
         var obj1=new tabledata();
         obj1.header=arr[arr.indexOf(index[0])-1].split('=')[1];
         //iterate the row(tr)
        index.forEach(x=>{
        var temparr=[];
        //iterate the td 
        x.split(',').forEach(y=>temparr.push(y));
        obj1.tds.push(temparr);
    });
    finalarray.push(obj1);
    });
    return finalarray;
    }
    function appendToTable(arr){
    var inhtml="";
    for(var i=0;i<arr.length;i++){
        debugger;
        inhtml+=`<div class='header'>${arr[i].header}</div>`
        var length=arr[i].tds[0].length;
        debugger;
        inhtml+="<div class='main-table-tag'><table class='table-tag'>";
        if(arr[i].tds[arr[i].tds.length-1][0]==="") arr[i].tds.pop();
        for(var tr=0;tr<arr[i].tds.length;tr++){
            var row=arr[i].tds[tr];
        inhtml+="<tr>";
        if(row[0]==='tr0'){
            length-=1;
            row.shift();
        }
        for(var j=0;j<length;j++){
            inhtml+=`<td>${row[j]===undefined?'<input type="text" readonly />':
            row[j].includes('_')?
            row[j].replace('_',' ').replace('_',' '):
            row[j].includes('=')?
            row[j].split('=')[1].replace('#',' '):
            row[j].includes('#')?
            row[j].replace('#',' '):row[j]}</td>`;
        }
        inhtml+="</tr>";
    }
    inhtml+="</table></div>"
    }
    console.log(inhtml);
    tabletag.innerHTML=inhtml;
    }

    // var scrapeddata=getData(str);
    // appendToTable(scrapeddata);

var request=new XMLHttpRequest();
request.open('Get','http://localhost:49593/get/GetInfo?basic=basic&read=1');
request.onload=function(){
    if(request.status>=200 && request.status==400){
    str=JSON.parse(this.responseText);
        alert('success');
        var scrapeddata=getData(str);
        appendToTable(scrapeddata);
    }else{
        str="";
        alert('connection failed');
        tabletag.innerHTML="<h1>No Data Get..</h1>"
    }
}
 request.send();

