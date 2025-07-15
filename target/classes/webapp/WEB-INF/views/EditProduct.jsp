<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<title>Mrittika Event Management</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bnsNew.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<style>
html,body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}
</style>
<body class="w3-light-grey">

<!-- Top container -->
<div class="w3-bar w3-top w3-black w3-large" style="z-index:4">
  <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i class="fa fa-bars"></i>  Menu</button>
  <span class="w3-bar-item w3-right"><a href="${pageContext.request.contextPath}/settings">Settings</a></span>
</div>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
 <jsp:include page="SidebarTop.jsp"/> 
  <hr>
  <div class="w3-container">
    <h5>Menu</h5>
  </div>
  <div class="w3-bar-block">
     <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
    <c:forEach items="${events}" var="event"> 
    <a href="${pageContext.request.contextPath}/products/${event.eventId}" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-hand-o-right fa-fw"></i>  ${event.eventName}</a>
    </c:forEach>
  </div>
</nav>


<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px;margin-top:43px;">

  <!-- Header -->
  <header class="w3-container" style="padding-top:22px">
    <h5><b><i class="fa fa-users"></i> Edit Product  </b></h5>
  </header>

  <div class="w3-panel">
    <div class="w3-row-padding" style="margin:0 -16px">
      
      <form:form method="POST" action="save" modelAttribute="product" cssClass="w3-container">
      
      <div class="row">
    	<div class="col-50">
      	<label for="fname"> Product Id</label>
    	</div>
    	<div class="col-50">
    	<form:hidden path="productId"/><label for="fname">${product.productId}</label>
    	</div>
  	 </div>
  	 
  	 <div class="row">
    	<div class="col-50">
      	<label for="fname">Select Product Status</label>
    	</div>
    	<div class="col-50">
      	<form:select path="status" cssClass="w3-select w3-border">
      	<form:option value="0" label="-- STATUS --" />
      	<form:options items="${prodStatus}" />
      	</form:select>
    	</div>
  	 </div>
  	
  	<div class="row">
    	<div class="col-50">
      	<label for="fname">${event.eventName }  </label>
    	</div>
    	<div class="col-50">
    	<form:input type="hidden" path="eventId" cssClass="w3-input w3-border" value="${event.eventId }"/>
    	
    	</div>
  	 </div>  	
  	 
  	<div class="row">
  	<div class="col-50">
  	<input type="submit" class="w3-button w3-red w3-third" value="Save" />
  	</div>
  	</div> 
  
  </form:form>
      
    </div>
  </div>
  

  <br>

  <!-- Footer -->
  <footer class="w3-container w3-padding-16 w3-light-grey">
    <h4>Mrittika</h4>
    <p>Connecting to our Roots</p>
  </footer>

  <!-- End page content -->
</div>

<script>
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
</script>

</body>
</html>