let map;

function initMap() {
  const location = Form.location.value;
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 15, lng: 32 },
    zoom: 8,
  });
}

const Form = document.getElementById('Form');

Form.addEventListener("submit", async (e) => {
  e.preventDefault();

// let geocoder = new google.maps.Geocoder();
// let address = "madrid";

// geocoder.geocode( { 'address': address}, function(results, status) {

// if (status == google.maps.GeocoderStatus.OK) {
//     let latitude = results[0].geometry.location.latitude;
//     let longitude = results[0].geometry.location.longitude;
//     console.log(latitude);
//     } 
// }); 

  // let varlat;
  // async function x(){

  //   let loc = Form.location.value;
  //        if (navigator.geolocation) {
  //           navigator.geolocation.getCurrentPosition(getPos);
  //        }
  //        function getPos(position) {
  //           let lat = position.coords.latitude;
  //           let long = position.coords.longitude;
  //           console.log(lat +"  yes")
  //           // console.log(long +"  yes")
            
  //           return lat;
  //        }
  //       }
  
  async function fetchTrendsJSON() {
  //   varlat = x()
  // console.log(varlat + "yyy")
    const location = Form.location.value;
    const locationresponse = await fetch("http://twitterapi.pharma.com.sd/?country=" + location);
    const woeid = await locationresponse.json();
    console.log(woeid);
    console.log(loc)
    const Trendsresponse = await fetch("http://twitterapi.pharma.com.sd/?woeid=" + woeid);
    const trends = await Trendsresponse.json();
    const { location: coords } = await( await fetch
    ("https://api.weatherapi.com/v1/current.json?key=8f7309e774b84bc79d3135126211612&q="+location)).json();
    const pos = new google.maps.LatLng(coords.lat, coords.lon);
    console.log(pos)
    let finaltrends = ""; 
    for (let trend of trends) {  
    finaltrends += trend.name + "-";
     }
     
     const string = finaltrends;
     const usingSplit = string.split('-');
     console.log(usingSplit)
     let finalcontent="";
     let trendnum;
     for (let i = 0; i < 20; i++) {
     finalcontent += usingSplit[i]+"<br>";
     trendnum = i;
    //Do something
    }
    len = trendnum+1
    console.log("this is " +len)
    let contentString = "Top "+len +" trends of "+location+" are :"+"<br>"+finalcontent;
    const myJSON = JSON.stringify(contentString);
    //////////////////
    const markplace = { lat: 15, lng: 32 }
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    map.setCenter(pos);
    const marker = new google.maps.Marker({
      position: pos,
      map,
      title: "Trends",
    });
  
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
    // const markk = document.getElementById('message').innerHTML="Top 50 trends of "+location+" are :"+"<br>"+myJSON;
    //  currentLatitude = woeid.latitude;
    //  const l = JSON.stringify(woeid);
    //  console.log(l)
    // console.log(finaltrends)
     }
  fetchTrendsJSON()
  
});

