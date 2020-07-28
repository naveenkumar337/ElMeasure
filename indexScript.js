var str="bid0=Basic&tr0=#,VLL,VLN,A,V_phase_angle,A_phase_angle,VTHD_V,_ATHD,K_factor_V,K_factor_A&tr1=Avg,0.0000000,0.0000000,0.0000000&tr2=R(V),0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000&tr3=Y(B),0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000&tr4=B(R),0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000&tr5=Frequency,0.0000000&tr6=RPM,0.0000000&bid1=Power&tr0,#,Watts,VA,VAR,PF&tr1=Total,0.0000000,0.0000000,0.0000000,0.0000000&tr2=R,0.0000000,0.0000000,0.0000000,0.0000000&tr3=Y,0.0000000,0.0000000,0.0000000,0.0000000&tr4=B,0.0000000,0.0000000,0.0000000,0.0000000&";
var scrapeddata=getData(str);
function getData(str){
var arr=str.split('&');
var mainarry=[];
var temparray=[]
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
class tabledata{
    header="";
    tds=[];
}
var finalarray=[];
mainarry.forEach(index=>
    {
     var obj1=new tabledata();
     obj1.header=arr[arr.indexOf(index[0])-1].split('=')[1];
    index.forEach(x=>{
    var temparr=[];
    x.split(',').forEach(y=>temparr.push(y));
    obj1.tds.push(temparr);
});
finalarray.push(obj1);
});
return finalarray;
}