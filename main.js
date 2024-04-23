Webcam.set({
width:350,
height:300,
    image_format:"png",
    png_quality:90
    })
    camera=document.getElementById("camera");
    Webcam.attach(camera);
    
    function take_snapshot() {
    Webcam.snap( function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    })
    }
    console.log('ml5 Version: ',ml5.version);
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/peyiK1vX6/model.json",model_loaded);
    
    function model_loaded() {
    console.log("Model Loaded"); 
}

var prediction1="";

function speak() {
    var synth=window.speechSynthesis;
    speak_data_1="The hand gesture is "+ prediction1;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}

function check() {
img=document.getElementById("captured_image");
classifier.classify(img,gotResults);
}

function gotResults(error,results) {
if (error) {
console.log(error);
}
else{
console.log(results);
document.getElementById("result_hand_name").innerHTML=results[0].label;
prediction1=results[0].label;
speak();
if(results[0].label=="Amazing") {
    document.getElementById("update_hand").innerHTML="&#128076";
    }
    if(results[0].label=="Best") {
        document.getElementById("update_hand").innerHTML="&#128077";
        }
    if(results[0].label=="Victory") {
            document.getElementById("update_hand").innerHTML="&#9996";
            }
            if(results[0].label=="Heart") {
                document.getElementById("update_hand").innerHTML="&#x2764;";
                }
}
}