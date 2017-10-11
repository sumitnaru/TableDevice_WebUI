type = ['', 'info', 'success', 'warning', 'danger'];

var value = 0;
function getDropdownSelectedValue() {
    value = document.getElementById("drpTime").value;
    console.log(value);
    two(File);
}
var cntarr = [];
var XArr = [];
var Y1Arr = [];
var Y2Arr = [];
var tempTableArray = [];
var TotalReqCount = 0;
var TotalEmergencyCount = 0;
var merged = [1];
var Filter1Arr = [];
var maxNuReqCount = 1;
var maxNuEmrCount = 1;
var TotalDeviceOnline = 0;
var TotalDeviceOffline = 0;
var maxAvgResponceTime = 1;
var TotalAvgResponse = 0;
var totalSelectedMin = 1;
var filterEmergncy = [];
var XEmeergencyArr = [];
var Y1EmeergencyArr = [];
var maxNoOfflineCount = 0;
var filterAvgRespons = [];
var XAvgResponsArr = [];
var Y1AvgResponsArr = [];

var filterOfflineArr = [];

var XfilterOfflineArr = [];
var YfilterOfflineArr = [];

function totalOfflineTable() {
    this.deviceId = 0;
    this.offLineCount = 0;
}

function emergengyTable(){
    this.deviceId = 0;
  //  this.statsId = 0;
    this.emergency = 0;
}
function avgResponseTimeTable() {
    this.deviceId = 0;
   // this.statsId = 0;
    this.count = 0;
    //this.request = 0;
    //this.request1 = 0;
    //this.emergency2 = 0;
}
function MainTable() {
    this.deviceId = 0;
    this.statsId = 0;
    this.day = 0;
    this.month = 0;
    this.year = 0;
    this.hour = 0;
    this.minitues = 0;
    this.second = 0;
    this.request = 0;
}


function SubTableRespns() {
    this.deviceId = 0;
   /// this.statsId = 0;
    //this.day = 0;
    //this.month = 0;
    //this.year = 0;
    //this.hour = 0;
    //this.minitues = 0;
    //this.second = 0;
    //this.request = 0;
}
function countTable() {
    this.deviceId = 0;
    this.emergency = 0;
    this.request = 0;

}

function filtercountTable() {
    this.deviceId = 0;
    this.emergency = 0;
    this.request = 0;

}
function SubTable() {
    this.deviceId = 0;
    this.statsId = 0;
    this.emergency = 0;
    this.request = 0;
}

var gg = [1];
var rsponsetime;
var filter2Arr = [0];

function two(files) {
    var file = files[0];
    console.log("File...");
  //  console.log(file);
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    setTimeout(function () {
        //console.log(reader);
        //var database = SQL.open(bin2Array(reader.result));
        var database = new SQL.Database(bin2Array(reader.result))
        var alldata = database.exec("SELECT * FROM STATUS");
        console.log("alldata-----------------------");
        alldata = alldata[0].values;
        alldatalength = alldata.length;

        var droptext = document.getElementById("drpTime");
        var min =parseInt(droptext.options[droptext.selectedIndex].value);
        totalSelectedMin = min;
        console.log("totalSelectedMin");
        console.log(totalSelectedMin);
        var fromTime = new Date();
        var fromTime5Min = new Date();
        fromTime5Min.setMinutes(fromTime5Min.getMinutes() - 2);
        fromTime.setMinutes(fromTime.getMinutes() - totalSelectedMin);
        var arrToatlOlineArr = [];
        var arrToatlOfflineArr = [];

        /*if (value != "" || value != null) {
            from.setMinutes(now.getMinutes() -parseInt(value));
        }
        else
            from.setMinutes(now.getMinutes() - min);*/
        for (var i = 0; i < alldata.length; i++) {
            // console.log("---------------"+dDate);
            var dYear = alldata[i][4];
            var dMonth = alldata[i][3];
            var dDay = alldata[i][2];
            var dHour = alldata[i][5];
            var dMin = alldata[i][6];
            var dSec = alldata[i][7];
            var dStr = dMonth+"-"+dDay+"-"+dYear+" "+dHour+":"+dMin+":"+dSec
            //01-01-2016 00:03:44
            var dTime = new Date(dStr);
            if (dTime >= fromTime) {
                // console.log("in<<<");
                var tempFilter = new MainTable();
                tempFilter.deviceId = alldata[i][0];
                tempFilter.statsId = alldata[i][1];
                tempFilter.day = dDay;
                tempFilter.month = dMonth;
                tempFilter.year = dYear;
                tempFilter.hour = dHour;
                tempFilter.minitues = dMin;
                tempFilter.second = dSec;
                Filter1Arr.push(tempFilter);
            }
            if (dTime >= fromTime5Min) {
              var ck = 0;
                for(var hh = 0; hh<arrToatlOlineArr.length; hh++){
                  if (arrToatlOlineArr[hh].deviceId == alldata[i][0]){
                    ck = 1;
                    break;
                  }
                }
                if(ck == 0){
                  var tmpcount = new countTable();
                  tmpcount.deviceId = alldata[i][0];
                  arrToatlOlineArr.push(tmpcount);
                  TotalDeviceOnline++;
                }
            }
            else{ // Offline
              var ck = 0;
                for(var hh = 0; hh<arrToatlOfflineArr.length; hh++){
                  if (arrToatlOfflineArr[hh].deviceId == alldata[i][0]){
                    ck = 1;
                    break;
                  }
                }
                if(ck == 0){
                  var tmpcount = new countTable();
                  tmpcount.deviceId = alldata[i][0];
                  arrToatlOfflineArr.push(tmpcount);
                  TotalDeviceOffline++;
                }
            }
        }
        console.log("TotalDeviceOnline");
        console.log(TotalDeviceOnline);
        console.log("TotalDevOffline");
        console.log(TotalDeviceOffline);

        rsponsetime = Filter1Arr.length;
        var val = parseFloat(alldatalength / Filter1Arr.length);
        sts0 = Math.round(100 / val).toFixed(2);
        var val1 = parseFloat(alldatalength /(alldatalength- Filter1Arr.length));
        sts1 = Math.round(100 / val1).toFixed(2);

        document.getElementById("rsptm").innerHTML = Filter1Arr.length;
        document.getElementById("ondvc").innerHTML = Filter1Arr.length;

        console.log(Filter1Arr);

        //Numbe Of request//
        for (var i = 0; i < Filter1Arr.length; i++) {

            if (Filter1Arr[i]["statsId"] == 3 || Filter1Arr[i]["statsId"] == 4) {
                console.log(Filter1Arr[i]);
                var tmpdid = Filter1Arr[i]["deviceId"];
                var ck = 0;
                for (var j = 0; j < cntarr.length; j++) {
                    if (cntarr[j].deviceId == tmpdid) {
                        if (Filter1Arr[i]["statsId"]==3)
                            cntarr[j].request += 1;
                        else
                            cntarr[j].emergency += 1;
                        ck = 1;

                        break;
                    }


                }
                if (ck == 0) {
                   // console.log("Ctreating Row");
                    var tmpcount = new countTable();
                    tmpcount.deviceId = tmpdid;
                    if (Filter1Arr[i]["statsId"] == 3) {
                        tmpcount.request = 1;
                        tmpcount.emergency = 0;
                    }
                    else {
                        tmpcount.request = 0;
                        tmpcount.emergency = 1;
                    }

                    cntarr.push(tmpcount);
                }
            }
        }

        console.log("Total Request Table");
        console.log(cntarr);
      //  console.log("number response -----------");
      //  console.log(cntarr);

        for (var l = 0; l < cntarr.length; l++) {
            if (maxNuReqCount < cntarr[l]["request"])
                maxNuReqCount = cntarr[l]["request"];
            if (maxNuReqCount < cntarr[l]["emergency"])
                maxNuReqCount = cntarr[l]["emergency"];

            TotalEmergencyCount += cntarr[l]["emergency"]
            TotalReqCount += cntarr[l]["request"];

            XArr.push(cntarr[l]["deviceId"]);
            Y1Arr.push(cntarr[l]["request"]);
            Y2Arr.push(cntarr[l]["emergency"]);
        }
        if(cntarr.length == 1){
          XArr.push(0);
          Y1Arr.push(0);
          Y2Arr.push(0);
        }
        console.log("maxNuReqCount----");
        console.log(maxNuReqCount);
        console.log("Total Request Count");
        console.log(TotalReqCount);
        console.log("Total Emmergency Count");
        console.log(TotalEmergencyCount);
        //end number of request//



        //emergency  request count
        for (var i = 0; i < Filter1Arr.length; i++) {

            if (Filter1Arr[i]["statsId"] == 4) {
                var tmpdid = Filter1Arr[i]["deviceId"];
                var ck = 0;
                for (var j = 0; j < filterEmergncy.length; j++) {
                    //console.log("tmpdid");
                   // console.log(filterEmergncy[j]);
                    if (filterEmergncy[j].deviceId == tmpdid) {
                        if (Filter1Arr[i]["statsId"] == 4)
                            filterEmergncy[j].emergency += 1;
                        var ck = 1;
                       // console.log("Rep**");

                        break;
                    }
                }
                if (ck == 0) {
                    var temcount = new emergengyTable();
                   // console.log("tttttttttttttttt**");
                    temcount.deviceId = tmpdid;
                    temcount.emergency = 1;
                    filterEmergncy.push(temcount);
                }

            }

        }
      //  console.log("eeeeeeeeeeeeeee");
     //   console.log(filterEmergncy);
        for (var l = 0; l < filterEmergncy.length; l++) {
            maxNuEmrCount = filterEmergncy[l]["emergency"]
            XEmeergencyArr.push(filterEmergncy[l]["deviceId"]);
            Y1EmeergencyArr.push(filterEmergncy[l]["emergency"]);
        }
        //console.log(filterEmergncy);
        //console.log(XEmeergencyArr);
        //console.log(Y1EmeergencyArr);

        //end emergency  request count

        //Avg   response  time
        /*for (var i = 0; i < Filter1Arr.length; i++) {

            var tmpdid = Filter1Arr[i]["deviceId"];
            var ck = 0;
            for (var j = 0; j < filterAvgRespons.length; j++) {
                if (filterAvgRespons[j].deviceId == tmpdid) {
                    filterAvgRespons[j].count += 1;
                    ck = 1;
                    break;
                }
            }
            if (ck == 0) {
                var tempcnt = new avgResponseTimeTable();
                tempcnt.deviceId = tmpdid;
                tempcnt.count = 1;
                filterAvgRespons.push(tempcnt);
            }
        }*/

        // Avarage Response Time Table //
        for (var i = 0; i < Filter1Arr.length; i++) {
            var tmpdstatus = Filter1Arr[i]["statsId"];
            if(tmpdstatus>0){
            var tmpdid = Filter1Arr[i]["deviceId"];
            var ck = 0;
            for (var j = 0; j < filterAvgRespons.length; j++) {
                if (filterAvgRespons[j].deviceId == tmpdid) {
                    filterAvgRespons[j].count += 1;
                    ck = 1;
                    break;
                }
            }
            if (ck == 0) {
                var tempcnt = new avgResponseTimeTable();
                tempcnt.deviceId = tmpdid;
                tempcnt.count = 1;
                filterAvgRespons.push(tempcnt);
            }
          }
        }

        for (var j = 0; j < filterAvgRespons.length; j++) {
            var tempID = filterAvgRespons[j]["deviceId"];
            for (var k = 0; k < cntarr.length; k++){
              if(tempID == cntarr[k]["deviceId"]){
                var cnt = filterAvgRespons[j]["count"];
                var nomreq = cntarr[k]["request"];
                filterAvgRespons[j]["count"] = cnt/nomreq;
                break;
              }
            }
        }

        for (var l = 0; l < filterAvgRespons.length; l++) {
          if(maxAvgResponceTime < filterAvgRespons[l]["count"])
            maxAvgResponceTime = filterAvgRespons[l]["count"];

            TotalAvgResponse += filterAvgRespons[l]["count"];

            XAvgResponsArr.push(filterAvgRespons[l]["deviceId"]);
            Y1AvgResponsArr.push(filterAvgRespons[l]["count"]);
        }
        if(filterAvgRespons.length == 1){
          XAvgResponsArr.push(0);
          Y1AvgResponsArr.push(0);
        }
        TotalAvgResponse /=  filterAvgRespons.length;
        console.log("TotalAvgResponceTime");
        console.log(TotalAvgResponse);
        console.log("maxAvgResponceTime");
        console.log(maxAvgResponceTime);
        console.log(filterAvgRespons);
        // END..................Avarage Response Time Table


        //Total Off Line
        /*for (var i = 0; i < Filter1Arr.length; i++) {
            var tmpdid = Filter1Arr[i]["deviceId"];
            if (Filter1Arr[i]["statsId"] == 4 || Filter1Arr[i]["statsId"] == 3) {
                var ck = 0;
                for (var j = 0; j < filterOfflineArr.length; j++) {
                    if (filterOfflineArr[j].deviceId == tmpdid) {
                        if (Filter1Arr[i]["statsId"] == 3)
                            filterOfflineArr[j].offLineCount += 1;
                        else
                            filterOfflineArr[j].offLineCount += 1;
                        ck = 1;

                        break;
                    }
                }
                if (ck == 0) {
                    // console.log("Ctreating Row");
                    var tempOffcnt = new totalOfflineTable();
                    tempOffcnt.deviceId = tmpdid;
                    if (Filter1Arr[i]["statsId"] == 3) {

                        tempOffcnt.offLineCount = 1;
                    }
                    else {
                        tempOffcnt.offLineCount = 1;
                    }
                    filterOfflineArr.push(tempOffcnt);
                }
            }
        }*/
        for (var i = 0; i < Filter1Arr.length; i++) {
            var tmpdid = Filter1Arr[i]["deviceId"];
                var ck = 0;
                for (var j = 0; j < filterOfflineArr.length; j++) {
                    if (filterOfflineArr[j].deviceId == tmpdid) {
                        filterOfflineArr[j].offLineCount += 1;
                        ck = 1;
                        break;
                    }
                }
                if (ck == 0) {
                     console.log("Ctreating Row");
                    var tempOffcnt = new totalOfflineTable();
                    tempOffcnt.deviceId = tmpdid;
                    tempOffcnt.offLineCount = 1;
                    filterOfflineArr.push(tempOffcnt);
                }
        }
        for (var l = 0; l < filterOfflineArr.length; l++) {
          var cnt = filterOfflineArr[l]["offLineCount"];
          console.log(filterOfflineArr[l]["deviceId"]);
          console.log(cnt);
          if((totalSelectedMin - cnt)<0)
          filterOfflineArr[l]["offLineCount"] = 0;
          else
          filterOfflineArr[l]["offLineCount"] = totalSelectedMin - cnt;
            if (maxNoOfflineCount < filterOfflineArr[l]["offLineCount"])
                maxNoOfflineCount = filterOfflineArr[l]["offLineCount"];
                XfilterOfflineArr.push(filterOfflineArr[l]["deviceId"]);
                YfilterOfflineArr.push(filterOfflineArr[l]["offLineCount"]);
            }
            console.log("maxNoOfflineCount");
            console.log(maxNoOfflineCount);
            console.log("Total Offline--");
            console.log(filterOfflineArr);
            console.log(XfilterOfflineArr);
            console.log(YfilterOfflineArr);



        demo.initChartist();

    }, 1000);
}

function updateTimeOnline() {
    var file = files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    var database = new SQL.Database(bin2Array(reader.result))
    var data = database.exec("SELECT * FROM STATUS");

}

function bin2Array(bin) {
    var i, size = bin.length, ary = [];
    for (i = 0; i < size; i++) {
        ary.push(bin.charCodeAt(i) & 0xFF);
    }
    return ary;
}

function four() {
    //alert("hi");
    setTimeout(function () {
        two(document.getElementById("filetype").files);
        four();
    }, 10000);
}

var getFileBlob = function (url, cb) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function () {
        cb(xhr.response);
    });
    xhr.send();
};

var blobToFile = function (blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
};
var getFileObject = function (filePathOrUrl, cb) {
    getFileBlob(filePathOrUrl, function (blob) {
        cb(blobToFile(blob, 'test.jpg'));
    });
};




var sts = 1,sts0 = 3,sts1 = 5;

demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },






    initChartist: function () {

        //var tempdataSales = {
        //    labels: XArr,
        //    series: [
        //        Y1Arr,
        //        Y2Arr]
        //};

        //var tempoptionsSales = {
        //    lineSmooth: false,
        //    low: 0,
        //    high: maxNuEmrCount,
        //    showArea: true,
        //    height: "245px",
        //    axisX: {
        //        showGrid: false,
        //    },
        //    lineSmooth: Chartist.Interpolation.simple({
        //        divisor: 3
        //    }),
        //    showLine: true,
        //    showPoint: false,

        //};

        //var tempresponsiveSales = [
        //  ['screen and (max-width: 640px)', {
        //      axisX: {
        //          labelInterpolationFnc: function (value) {
        //              return value[0];
        //          }
        //      }
        //  }]
        //];


        var tempdataSalesAvg = {
            labels: XAvgResponsArr,
            series: [
              Y1AvgResponsArr
            ]
        };

        var tempoptionsSalesAvg = {
            lineSmooth: false,
            low: 0,
            high: maxNuEmrCount,
            showArea: true,
            height: "245px",
            axisX: {
                showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,

        };

        var tempresponsiveSalesAvg = [
          ['screen and (max-width: 640px)', {
              axisX: {
                  labelInterpolationFnc: function (value) {
                      return value[0];
                  }
              }
          }]
        ];

        Chartist.Line('#chartHours2', tempdataSalesAvg, tempoptionsSalesAvg, tempresponsiveSalesAvg);


        var tempdataSalesEmeerRqst = {
            labels: XEmeergencyArr,
            series: [
                Y1EmeergencyArr
              // [287, 385, 490, 562, 594, 626, 698, 895, 952],
              //[67, 152, 193, 240, 387, 435, 535, 642, 744],
              //[23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
        };


        var tempoptionsSalesEmeerRqst = {
            lineSmooth: false,
            low: 0,
            high: maxNuEmrCount,
            showArea: true,
            height: "245px",
            axisX: {
                showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,

        };

        var tempresponsiveSalesEmeerRqst = [
          ['screen and (max-width: 640px)', {
              axisX: {
                  labelInterpolationFnc: function (value) {
                      return value[0];
                  }
              }
          }]
        ];


        Chartist.Line('#chartHoursEmrgency', tempdataSalesEmeerRqst, tempoptionsSalesEmeerRqst, tempresponsiveSalesEmeerRqst);

        // Chartist.Line('#chartHours2', tempdataSales, tempoptionsSales, tempresponsiveSales);

        var tempdataSalesOffline = {
            labels: XfilterOfflineArr,
            series: [YfilterOfflineArr]
        };

        var tempoptionsSalesOffline = {
            lineSmooth: false,
            low: 0,
            high: maxNuEmrCount,
            showArea: true,
            height: "245px",
            axisX: {
                showGrid: false,
            },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
            showLine: true,
            showPoint: false,

        };

        var tempresponsiveSalesOffline = [
          ['screen and (max-width: 640px)', {
              axisX: {
                  labelInterpolationFnc: function (value) {
                      return value[0];
                  }
              }
          }]
        ];

        Chartist.Line('#chartHours3', tempdataSalesOffline, tempoptionsSalesOffline, tempresponsiveSalesOffline);



        var dataSales1 = {
            //  labels: ['2:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            labels: XArr,
          series: [
             Y1Arr,
            Y2Arr
          ]
        };

        var optionsSales1 = {
          lineSmooth: false,
          low: 0,
          high: maxNoOfflineCount,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales1 = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales1, optionsSales1, responsiveSales1);


        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

       // Chartist.Line('#chartActivity', data, options, responsiveOptions);

        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
            //labels: [sts0 + '%', sts1 + '%', sts2 + '%'],
            //series: [sts0, sts1, sts2]
            labels: [sts0 + '%', sts1 + '%'],
            series: [sts0, sts1]
        });
    },

    initGoogleMaps: function(){
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-gift",
        	message: "Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	},
    initDocumentationCharts: function(){
    //     	init single simple line chart
        var dataPerformance = {
          labels: ['6pm','9pm','11pm', '2am', '4am', '8am', '2pm', '5pm', '8pm', '11pm', '4am'],
          series: [
            [1, 6, 8, 7, 4, 7, 8, 12, 16, 17, 14, 13]
          ]
        };

        var optionsPerformance = {
          showPoint: false,
          lineSmooth: true,
          height: "200px",
          axisX: {
            showGrid: false,
            showLabel: true
          },
          axisY: {
            offset: 40,
          },
          low: 0,
          high: 16,
          height: "250px"
        };

        Chartist.Line('#chartPerformance', dataPerformance, optionsPerformance);

    //     init single line with points chart
        var dataStock = {
          labels: ['\'07','\'08','\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
          series: [
            [22.20, 34.90, 42.28, 51.93, 62.21, 80.23, 62.21, 82.12, 102.50, 107.23]
          ]
        };

        var optionsStock = {
          lineSmooth: false,
          height: "200px",
          axisY: {
            offset: 40,
            labelInterpolationFnc: function(value) {
                return '$' + value;
              }

          },
          low: 10,
          height: "250px",
          high: 110,
            classNames: {
              point: 'ct-point ct-green',
              line: 'ct-line ct-green'
          }
        };

        Chartist.Line('#chartStock', dataStock, optionsStock);

    //      init multiple lines chart
        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        };

        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

    //      pie chart
        Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%'],
          series: [62, 32, 6]
        });

    //      bar chart
        var dataViews = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
          ]
        };

        var optionsViews = {
          seriesBarDistance: 10,
          classNames: {
            bar: 'ct-bar'
          },
          axisX: {
            showGrid: false,

          },
          height: "250px"

        };

        var responsiveOptionsViews = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Bar('#chartViews', dataViews, optionsViews, responsiveOptionsViews);

    //     multiple bars chart







        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartActivity', data, options, responsiveOptions);

    }

}
