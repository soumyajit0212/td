<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

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
<div class="w3-bar w3-top w3-mrittika w3-large" style="z-index:4">
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
    <a href="${pageContext.request.contextPath}/products/${event.eventId}" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-shopping-cart fa-fw"></i>  ${event.eventName}</a>
    </c:forEach>
  </div>
</nav>


<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px;margin-top:43px;">

  <!-- Header -->
  <header class="w3-container" style="padding-top:22px">
    <h5><b><i class="fa fa-shopping-cart"></i> Enter Product Types for ${product.productName } </b></h5>
  </header>
	
	<div class="w3-panel">
    <div class="w3-row-padding" style="margin:0 -16px">
    <table class="w3-table-all w3-hoverable">
    <tr class="w3-hover-red">
    <td>Product Name</td><td>${product.productName }</td>
    </tr>
     <tr class="w3-hover-red">
    <td>Product Type</td><td>${product.productType }</td>
    </tr>
     <tr class="w3-hover-red">
    <td>Event</td><td>${event.eventName }</td>
    </tr>
     <tr class="w3-hover-red">
    <td>Mandatory for All</td><td>${product.mandatory }</td>
    </tr>
     <tr class="w3-hover-red">
    <td>Product Status</td><td>${product.status }</td>
    </tr>
  	 </table>
    </div>
    </div>
    
     <div class="w3-panel">
    <div class="w3-row-padding" style="margin:0 -16px">
      
      <table class="w3-table-all w3-hoverable">
      <tr class="w3-red"><th>PRODUCT TYPE</th><th>PRODUCT SUB-TYPE</th><th>PRODUCT SIZE</th><th>PRODUCT PRICE</th></tr>
      <c:forEach items="${prodTypes}" var="types"> 
      <tr class="w3-hover-grey">
      <td>${types.productType}</td><td>${types.productSubType}</td><td>${types.productSize}</td><td>${types.unitPrice}</td>
      </tr>
      </c:forEach>
      </table>
      
    </div>
  </div>
    
  <div class="w3-panel">
    <div class="w3-row-padding" style="margin:0 -16px">
      
      <form:form method="POST" action="${pageContext.request.contextPath}/products/${product.productId }/type/save" modelAttribute="type" cssClass="w3-container">
      
      <div class="row">
    	<div class="col-50">
      	<label for="fname">Enter Product Type (Veg, Non-Veg, etc.) </label>
    	</div>
    	<div class="col-50">
    	<form:input path="productType" cssClass="w3-input w3-border" />
    	
    	</div>
  	 </div>
  	 
  	 <div class="row">
    	<div class="col-50">
      	<label for="fname">Enter Product Sub-Type (Meal Preference like Chicken, Mutton etc.)</label>
    	</div>
    	<div class="col-50">
    	<form:input path="productSubType" cssClass="w3-input w3-border" />
    	
    	</div>
  	 </div>

	<div class="row">
    	<div class="col-50">
      	<label for="fname">Select Unit Size. (This is to distinguish, Adult, Child and Elder)</label>
    	</div>
    	<div class="col-50">
      	<form:select path="productSize" cssClass="w3-select w3-border">
      	<form:option value="0" label="-- SIZE --" />
      	<form:options items="${prodSize}" />
      	</form:select>
    	</div>
  	 </div>
  	 
  	 <div class="row">
    	<div class="col-50">
      	<label for="fname">Enter Unit Price</label>
    	</div>
    	<div class="col-50">
    	<form:input path="unitPrice" cssClass="w3-input w3-border" />
    	
    	</div>
  	 </div>
  	 
  	<div class="row">
  	<div class="col-50">
  	<button type="submit" class="w3-button w3-red w3-third" value="Save" >SAVE</button>
  	</div>
  	<div class="col-50">
  	<a href="${pageContext.request.contextPath}/products/${event.eventId}" class="w3-button w3-block w3-left-align w3-red w3-third">Done</a>
  	</div>
  	</div> 
  
  </form:form>
      
    </div>
  </div>
  

  <br>

  <!-- Footer -->
  <footer class="w3-container w3-padding-16 w3-light-grey">
    <h4><img src="${pageContext.request.contextPath}/resources/images/Red_Logo.jpg" class="w3-rectriangle w3-margin-right"  style="width:150px"></h4>
    <p>Connecting to Our Roots</p>
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