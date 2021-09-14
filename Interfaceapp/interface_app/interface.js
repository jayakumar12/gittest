
var info = 30
var data = 50
var index = 0;
var gdata;
var ip4index =0;
var ip6index =0;
window.onload = function() {
    console.log("setup called")
    //Setup();
    var socket = new WebSocket("ws://127.0.0.1:8080/ws/view");
    console.log("Attempting Connection...");
     data =30
    socket.onopen = () => {
        console.log("Successfully Connected");
        //socket.send("Hi From the Client!")
        //socket.send(person)
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
        socket.send("Client Closed!")
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };

    socket.onmessage = function (event) {
        index =0;
        console.log(event.data)
        info = JSON.parse(event.data)
        console.log(info)
        var len = info.Interfaces.length;
        console.log(len)
        
        for( var i=0;i<info.Interfaces.length;i++)
        {
            var element = document.getElementById(i.toString())
            element.style.display = "block"
            element.textContent =info.Interfaces[i].InterfaceName;
        }
        console.log(info.Interfaces[0])
        data = info.Interfaces[0]
        waninfo(0)
    }
    //document.getElementById("description").style.display = "none";
   
}

function Setup() {
        for( var i=0;i<6;i++)
        {
            var element = document.getElementById(i.toString())
            element.style.display = "none"
        }
        networkmode();
        document.getElementById("table5").style.display = "none";
}

function porttype() {
    var v = document.getElementById("port-type").value;
    if (v == "USB 3G/4G" || v == "Onboard 4G") {
        document.getElementById("table3").style.display = "none";
        document.getElementById("loopback-option1").style.display = "none";
        document.getElementById("loopback-mask-option").style.display = "none";
        document.getElementById("mpls-option").style.display = "none";
        document.getElementById("apn-option").style.display = "block";
        
    } else {
        document.getElementById("table3").style.display = "block";
        document.getElementById("loopback-option1").style.display = "block";
        document.getElementById("loopback-mask-option").style.display = "block";
        document.getElementById("mpls-option").style.display = "block";
        document.getElementById("apn-option").style.display = "none";
    }
    
}

function networkmode() {
    var v = document.getElementById("network-mode").value
    console.log(v)
    if (v == "IPv4") {
        document.getElementById("ip4-config").style.display = "block";
        document.getElementById("ip6-config").style.display = "none";
        document.getElementById("dns4-option").style.display = "block";
        document.getElementById("dns6-option").style.display = "none";
        document.getElementById("end-point4-option").style.display = "block";
        document.getElementById("end-point6-option").style.display = "none";
    }
    else if (v == "IPv6") {
        document.getElementById("ip4-config").style.display = "none";
        document.getElementById("ip6-config").style.display = "block";
        document.getElementById("dns4-option").style.display = "none";
        document.getElementById("dns6-option").style.display = "block";
        document.getElementById("end-point4-option").style.display = "none";
        document.getElementById("end-point6-option").style.display = "block";
    } else if(v == "Dual") {
        document.getElementById("ip4-config").style.display = "block";
        document.getElementById("ip6-config").style.display = "block";
        document.getElementById("dns4-option").style.display = "block";
        document.getElementById("dns6-option").style.display = "block";
        document.getElementById("end-point4-option").style.display = "block";
        document.getElementById("end-point6-option").style.display = "block";
    } else {
        document.getElementById("ip4-config").style.display = "none";
        document.getElementById("ip6-config").style.display = "none";
        document.getElementById("dns4-option").style.display = "block";
        document.getElementById("dns6-option").style.display = "none";
        document.getElementById("end-point6-option").style.display = "none";
    }
}

function ToggleAutoDNS() {
    var element = document.getElementById("auto-dns");
    if (element.checked == false) {
        document.getElementById("dns4-option").style.display = "none"
        document.getElementById("dns6-option").style.display = "none"
    } else {
        document.getElementById("dns4-option").style.display = "inline"
        document.getElementById("dns6-option").style.display = "inline"
    }
}

function AutoNegOn() {
    //var val = document.getElementById("on").checked
    console.log(document.getElementById("on").value)
    if(document.getElementById("on").checked = true){
        document.getElementById("auto-neg-speed-option").style.display = "none";
        document.getElementById("auto-neg-duplex-option").style.display = "none";
    } 
}

function AutoNegOff() {
    //var val = document.getElementById("off").checked
    console.log(document.getElementById("off").value)
    if(document.getElementById("off").checked = true){
        document.getElementById("auto-neg-speed-option").style.display = "block";
        document.getElementById("auto-neg-duplex-option").style.display = "block";
    }
}

function check() {
    var element = document.getElementById("checkbox")
    if (element.checked == true) {
        document.getElementById("check-data").textContent = "Checked";
    } else {
        document.getElementById("check-data").textContent = "unchecked";
    }
}

function SubmitData() {
    var socket = new WebSocket("ws://127.0.0.1:8080/ws/save");
    console.log("Attempting Connection...");
    var data =30
    socket.onopen = () => {
        console.log("Successfully Connected");
    
         var person = {
            InterfaceName : document.getElementById("interface-name").value,
            PortType : document.getElementById("port-type").value,
            AssociatedPort : document.getElementById("associated-port").value,
            Vlan : document.getElementById("vlan").value,
            NetworkMode : document.getElementById("network-mode").value,
            Type : document.getElementById("type").value,
            IgnoreAutoDNS : document.getElementById("auto-dns").checked,
            DNS4 : document.getElementById("dns4").value,
            DNS6 : document.getElementById("dns6").value,
            MTU : document.getElementById("mtu").value,
            APN : document.getElementById("apn").value,
            AutoNeg : document.getElementById("auto-neg").value,
            Speed : document.getElementById("speed").value,
            Duplex : document.getElementById("duplex").value,
            CS : document.getElementById("cs").checked,
            PreferredController : document.getElementById("preferred-controller").checked,
            GateWay : document.getElementById("gateway").checked,
            EndPoint4 : document.getElementById("end-point4").value,
            EndPoint6 : document.getElementById("end-point6").value,
            LoopbackIP : document.getElementById("loopback-ip").value,
            LoopbackMask: document.getElementById("loopback-mask").value,
            MPLS : document.getElementById("mpls").checked,
            IP4 : document.getElementById("ip4").value,
            PrefixLength4 : document.getElementById("prefix-length4").value,
            GateWay4 : document.getElementById("gateway4").value,
            StaticNatIP4 : document.getElementById("static-nat-ip4").value,
            IP6 : document.getElementById("ip4").value,
            PrefixLength6 : document.getElementById("prefix-length6").value,
            GateWay6 : document.getElementById("gateway6").value,
            StaticNatIP6 : document.getElementById("static-nat-ip6").value,
         }
        console.log(person)
        info.Interfaces[index]=person;
        socket.send(JSON.stringify(info))
    };  
}

function waninfo(x) {
    index = x;
    data = info.Interfaces[x]
    console.log("waninfo")
    console.log(data)
    
        document.getElementById("vlan").value = data.Vlan;
        document.getElementById("dns4").value = data.DNS4;
        document.getElementById("dns6").value = data.DNS6;
        document.getElementById("mtu").value = data.MTU;
        document.getElementById("apn").value = data.APN;
        document.getElementById("end-point4").value = data.EndPoint4;
        document.getElementById("end-point6").value = data.EndPoint6;
        document.getElementById("interface-name").value = data.InterfaceName;
        document.getElementById("port-type").value=data.PortType;
        document.getElementById("associated-port").value = data.AssociatedPort;
        //document.getElementById("network-mode").value = data.NetworkMode;
        //document.getElementById("type").value = data.Type;
        //document.getElementById("auto-neg").value = data.AutoNeg;
        
        // document.getElementById("on").checked = data.On;
        // document.getElementById("off").checked = data.Off;
        // document.getElementById("50").checked = data.50;
        // document.getElementById("100").checked = data.100;
        // document.getElementById("halfduplex").checked = data.HalfDuplex;
        // document.getElementById("duplex").checked = data.Duplex;
        document.getElementById("speed").value = data.Speed;
        document.getElementById("duplex").value = data.Duplex;
        document.getElementById("loopback-ip").value = data.LoopbackIP;
        document.getElementById("loopback-mask").value = data.LoopbackMask;
        document.getElementById("ip4").value = data.IP4;
        document.getElementById("ip6").value = data.IP6;
        document.getElementById("prefix-length4").value = data.PrefixLength4;
        document.getElementById("prefix-length6").value = data.PrefixLength6;
        document.getElementById("gateway4").value = data.GateWay4;
        document.getElementById("gateway6").value = data.GateWay6;
        document.getElementById("static-nat-ip4").value = data.StaticNatIP4;
        document.getElementById("static-nat-ip6").value = data.StaticNatIP6;
        document.getElementById("auto-dns").checked = data.IgnoreAutoDNS;
        document.getElementById("cs").checked = data.CS;
        document.getElementById("preferred-controller").checked = data.PreferredController;
        document.getElementById("gateway").checked = data.GateWay;
        document.getElementById("mpls").checked = data.MPLS;

        ToggleAutoDNS();
        AutoNeg();
        networkmode();
}

function AddIPv4() {
    ip4index++;
    console.log("sravan")
    var element = document.getElementById("ip4-config")
    var table = document.createElement('table');
    var tr= document.createElement('tr');

    var td1 = document.createElement('td');
    var text = document.createTextNode('Type');
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("select");
    var option =document.createElement("option");
    option.value = "";
    var option_data = document.createTextNode("Select-option")
    option.appendChild(option_data);
    input.appendChild(option)
    option =document.createElement("option");
    option.value = "DHCP";
    option_data = document.createTextNode("DHCP")
    option.appendChild(option_data);
    input.appendChild(option)
    input.id = "type4-"+ip4index.toString();
    td1.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);
    
    var td1 = document.createElement('td');
    var text = document.createTextNode('IP');
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "ip4-option-"+ip4index.toString();

    input.id = "ip4-"+ip4index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)
    text = document.createTextNode("UserName");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "username4-option-"+ip4index.toString();

    input.id = "username4-"+ip4index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)

    tr.appendChild(td1);

    var td1 = document.createElement('td');
    var text = document.createTextNode("Prefix");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "prefix-length4-option"+ip4index.toString();

    input.id = "prefix-length-"+ip4index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)
    text = document.createTextNode("Password");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "password";
    var div = document.createElement("div")
    div.id = "password4-option-"+ip4index.toString();

    input.id = "password4-"+ip4index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)

    tr.appendChild(td1);

    var td1 = document.createElement('td');
    var text = document.createTextNode("Gateway");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "gateway4-option"+ip4index.toString();

    input.id = "gateway4"+ip4index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)
    text = document.createTextNode("DHCP Server");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "dhcp4-option-"+ip4index.toString();

    input.id = "dhcp4-"+ip4index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)

    tr.appendChild(td1);



    td1 = document.createElement('td');
    text = document.createElement("i");
    text.className = "fa fa-trash";
    input = document.createElement("span");
    input.appendChild(text)
    //td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    
    
    table.appendChild(tr);
    console.log(tr)
    element.appendChild(table);  
}

function AddIPv6() {
    ip4index++;
    console.log("sravan")
    var element = document.getElementById("ip6-config")
    var table = document.createElement('table');
    var tr= document.createElement('tr');

    var td1 = document.createElement('td');
    var text = document.createTextNode('Type');
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("select");
    var option =document.createElement("option");
    option.value = "";
    var option_data = document.createTextNode("Select-option")
    option.appendChild(option_data);
    input.appendChild(option)
    option =document.createElement("option");
    option.value = "DHCP";
    option_data = document.createTextNode("DHCP")
    option.appendChild(option_data);
    input.appendChild(option)
    input.id = "type6-"+ip4index.toString();
    td1.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);
    
    var td1 = document.createElement('td');
    var text = document.createTextNode('IP');
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "ip6-option-"+ip6index.toString();

    input.id = "ip6-"+ip6index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)
    text = document.createTextNode("UserName");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "username6-option-"+ip6index.toString();

    input.id = "username6-"+ip6index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)

    tr.appendChild(td1);

    var td1 = document.createElement('td');
    var text = document.createTextNode("Prefix");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "prefix-length6-option"+ip6index.toString();

    input.id = "prefix-length6-"+ip6index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)
    text = document.createTextNode("Password");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "password";
    var div = document.createElement("div")
    div.id = "password6-option-"+ip6index.toString();

    input.id = "password6-"+ip6index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)

    tr.appendChild(td1);

    var td1 = document.createElement('td');
    var text = document.createTextNode("Gateway");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "gateway6-option"+ip6index.toString();

    input.id = "gateway6"+ip6index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)
    text = document.createTextNode("DHCP Server");
    var label = document.createElement('lable');
    label.appendChild(text)
    var input = document.createElement("input");
    input.type = "text";
    var div = document.createElement("div")
    div.id = "dhcp6-option-"+ip6index.toString();

    input.id = "dhcp6-"+ip6index.toString();
    div.appendChild(label)
    //td1.appendChild(document.createElement("br"))
    div.appendChild(input)
    td1.appendChild(div)

    tr.appendChild(td1);



    td1 = document.createElement('td');
    text = document.createElement("i");
    text.className = "fa fa-trash";
    input = document.createElement("span");
    input.appendChild(text)
    //td1.appendChild(document.createElement("br"))
    td1.appendChild(input)
    tr.appendChild(td1);

    
    
    table.appendChild(tr);
    console.log(tr)
    element.appendChild(table);  
}


var wan_info = {
    InterfaceName: document.getElementById("interface-name").value,
    PortType : document.getElementById("port-type").value,
    AssociatedPort : document.getElementById("associated-port").value,
    Vlan : document.getElementById("vlan").value,
    MTU : document.getElementById("mtu").value,
    AutoNegOn : document.getElementById("on").value,
    AutoNegOff : document.getElementById("off").value,
    Speed50 : document.getElementById("speed50").value,
    Spedd100 : document.getElementById("speed100").value,
    Duplex : document.getElementById("duplex").value,
    HalfDuplex : document.getElementById("halfduplex").value,
    LoopbackIP : document.getElementById("loopback-ip").value,
    LoopbackMask: document.getElementById("loopback-mask").value,
    APN : document.getElementById("apn").value,
    MPLS : document.getElementById("mpls").checked,
    DNS4 : document.getElementById("dns4").value,
    DNS6 : document.getElementById("dns6").value,

    NetworkType4 : document.getElementById("type4-0").value,
    IP4 : document.getElementById("ip-4").value,
    UserName4 : document.getElementById("username4-0").value,
    PrefixLength4 : document.getElementById("prefix-length4-0").value,
    Password4 : document.getElementById("password4-0").value,
    GateWay4 : document.getElementById("gateway4-0").value,
    DHCP4 : document.getElementById("dhcp4-0").value,
    NatIP4 : document.getElementById("static-nat-ip4-0").value,

    NetworkType6 : document.getElementById("type6-0").value,
    IP6 : document.getElementById("ip-6").value,
    UserName6 : document.getElementById("username6-0").value,
    PrefixLength6 : document.getElementById("prefix-length6-0").value,
    Password6 : document.getElementById("password6-0").value,
    GateWay6 : document.getElementById("gateway6-0").value,
    DHCP6 : document.getElementById("dhcp6-0").value,
    NatIP6 : document.getElementById("static-nat-ip6-0").value,

    CS : document.getElementById("cs").checked,
    PreferredController : document.getElementById("preferred-controller").checked,
    GateWay : document.getElementById("gateway").checked,
    EndPoint4 : document.getElementById("end-point4").value,
    EndPoint6 : document.getElementById("end-point6").value,
}

    // data = info.Interface[0];
    // document.getElementById("interface-name").value = data.InterfaceName
    // document.getElementById("port-type").value = data.PortType
    // document.getElementById("associated-port").value = data.AssociatedPort
    // document.getElementById("vlan").value = data.Vlan
    // document.getElementById("mtu").value = data.MTU
    // document.getElementById("on").value = data.AutoNegOn
    // document.getElementById("off").value = data.AutoNegOff 
    // document.getElementById("speed50").value = data.Speed50
    // document.getElementById("speed100").value = data.Spedd100
    // document.getElementById("duplex").value = data.Duplex
    // document.getElementById("halfduplex").value = data.HalfDuplex
    // document.getElementById("loopback-ip").value = data.LoopbackIP
    // document.getElementById("loopback-mask").value = data.LoopbackMask
    // document.getElementById("apn").value = data.APN
    // document.getElementById("mpls").checked = data.MPLS
    // document.getElementById("dns4").value = data.DNS4
    // document.getElementById("dns6").value = data.DNS6

    // document.getElementById("type4-0").value = data.NetworkType4
    // document.getElementById("ip-4").value = data.IP4
    // document.getElementById("username4-0").value = data.UserName4
    // document.getElementById("prefix-length4-0").value = data.PrefixLength4
    // document.getElementById("password4-0").value = data.Password4
    // ocument.getElementById("gateway4-0").value = data.GateWay4
    // document.getElementById("dhcp4-0").value = data.DHCP4
    // document.getElementById("static-nat-ip4-0").value = data.NatIP4

    // document.getElementById("type6-0").value = data.NetworkType6
    // document.getElementById("ip-6").value = data.IP6
    // document.getElementById("username6-0").value = data.UserName6
    // document.getElementById("prefix-length6-0").value = data.PrefixLength6
    // document.getElementById("password6-0").value = data.Password6
    // document.getElementById("gateway6-0").value = data.GateWay6
    // document.getElementById("dhcp6-0").value = data.DHCP6
    // document.getElementById("static-nat-ip6-0").value = data.NatIP6

    // document.getElementById("cs").checked = data.CS
    // document.getElementById("preferred-controller").checked = data.PreferredController
    // document.getElementById("gateway").checked = data.GateWay
    // document.getElementById("end-point4").value = data.EndPoint4
    // document.getElementById("end-point6").value = data.EndPoint6


function DeleteData(){
    var flag = false
    var val = document.getElementById("checkbox").checked
    // if(document.getElementById("delete")) {
    //     document.getElementById("description").style.display = "block";
    //     val = document.getElementById("checkbox").checked
    // }
       
    console.log(val.checked)
    
    if(val) {
        flag = true
    }
    if(flag){

    } else {
        alert("Please click the checkbox to delete");
    }
   
    
    
}