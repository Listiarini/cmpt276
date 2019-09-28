window.onload = function() {
    var capacity = 4;
    var gradeDec = [0, 0, 0, 0];
    var weightNum = [0, 0, 0, 0];
    var resultNum = -1; // not yet calculated
    
    var weightArr = [0, 0, 0, 0];
    var gradeArr = [0, 0, 0, 0];
    var totalArr = [0, 0, 0, 0];
    var percentArr = [0, 0, 0, 0];
    
    weightArr[0] = document.getElementById("w1");
    gradeArr[0] = document.getElementById("g1");
    totalArr[0] = document.getElementById("t1");
    percentArr[0] = document.getElementById("p1");
    
    weightArr[1] = document.getElementById("w2");
    gradeArr[1] = document.getElementById("g2");
    totalArr[1] = document.getElementById("t2");
    percentArr[1] = document.getElementById("p2");
    
    weightArr[2] = document.getElementById("w3");
    gradeArr[2] = document.getElementById("g3");
    totalArr[2] = document.getElementById("t3");
    percentArr[2] = document.getElementById("p3");
    
    weightArr[3] = document.getElementById("w4");
    gradeArr[3] = document.getElementById("g4");
    totalArr[3] = document.getElementById("t4");
    percentArr[3] = document.getElementById("p4");
    
    var reset = document.getElementById("reset");
    var mean = document.getElementById("mean");
    var weighted = document.getElementById("weighted");
    var result = document.getElementById("result");
    var calculate = document.getElementById("calculate");
    var grade = document.getElementById("grade");
 
    
    function checkGradeComplete(grade, total) {
        if ( (grade!="" && total=="") || (grade=="" && total!="") ) {
            return false;
        }
        else {
            return true;
        } 
    }
    
    function checkWeightComplete(weight, grade, total) {
        if ( grade!="" && total!="" && weight!="" ) {
            return true;
        }
        else if ( grade=="" && total=="" && weight=="" ) {
            return true;
        }
        else {
            return false;
        }
    }
    
    function checkGradeValid(grade, total) {   
        if(isNaN(grade) || isNaN(total)) {
            alert("Input of grade must be a positive number");
            return false;
        }
        else if (total==0) {
            if (grade==0) {
                alert("If there is no grade, empty both boxes instead of zeroes.");
            }
            else {
                alert("Cannot divide by zero.");    
            }
            
            return false;
        }
        else if (grade<0 || total<0) {
            alert("Input of grade must be a positive number");
            return false;
        }
        else {
            return true;
        }
            
    }
    
    function checkWeightValid(weight) {
        if(isNaN(weight) || weight<0) {
            alert("Input of weight must be a non-negative number");
            return false;
        }
        else {
            return true;
        }
    }
    
    function insertGradeValid(grade, total, i) {
        if (grade!="" && total!="") {
            if (checkGradeValid(grade, total)) {
                gradeDec[i] = grade/total;
                return 1; // if input is valid, continue the calculation
            }
            else {
                gradeDec[i] = 0;
                return -1;  // if input is invalid, stop the calculation
            }
        }
        else {
            gradeDec[i] = 0;
            return 0; // if there is no grade on the activity, set input to zero
        }
    }
    
    function insertWeightValid(weight, i) {
        if (weight!="") {
            if (checkWeightValid(weight)) {
                weightNum[i] = parseInt(weight, 10);
                return weightNum[i];
            }
            else {
                weightNum[i] = 0;
                return -1;
            }
        }
        else {
            weightNum[i] = 0;
            return 0;
        }
    }
    
    function updatePercentage(grade, total, out) {
        if (grade=="" && total=="") {
            out.innerHTML = "";
        }
        else if (grade == "") {
            out.innerHTML = "type the given grade";
        }
        else if (total == "") {
            out.innerHTML = "type the total grade";
        }
        else {
            if (checkGradeValid(grade, total)) {
                var p = (grade/total);
                p = +(p*100).toFixed(4); //accurate up to 4 digits decimal and drop unnecessary zero
                out.innerHTML = p + "%";    
            }
        }
    }
    
    mean.addEventListener("click", function meanGrade() {
        var m = 0;
        var isComplete = true;
        
        for (var i=0; i<capacity; i++) {
            if (!checkGradeComplete(gradeArr[i].value, totalArr[i].value)) {
                alert("Complete both textboxes grade for activities. If there is no grade, empty both boxes.");
                isComplete = false;
            }    
        }
        
        if (isComplete) {  //check if all the input are valid
            var activity = 0;
            var valid = true;
            var i = 0; 
            while (i<capacity && valid) {
               var add = insertGradeValid(gradeArr[i].value, totalArr[i].value, i);
                if (add != -1) {
                    activity = activity + add;    
                }
                else {
                    valid = false; // if input is invalid, stop the calculation
                }
                i++;
            }
            
            if (valid) {  // when all input are valid, calculate
                if (activity==0) {
                    alert("Please input some number in grade texbox.");
                }
                else {
                    m = (gradeDec[0] + gradeDec[1] + gradeDec[2] + gradeDec[3])/activity;
                    m = +(m*100).toFixed(4); //accurate up to 4 digits decimal and drop unnecessary zero
                    resultNum = m;
                    result.innerHTML = m + " / 100";    
                }
            }
        }
    });
    
    weighted.addEventListener("click", function weightGrade() {
        var w = 0;
        var isComplete = true;
        
        for (var i=0; i<capacity; i++) {
            if (!checkWeightComplete(weightArr[i].value, gradeArr[i].value, totalArr[i].value)) {
                alert("Complete both textboxes grade and weight textbox for activities. If there is no grade, empty all three boxes.");
                isComplete = false;
            }    
        }
        
        if (isComplete) { //check if all the input are valid
            var totalWeight = 0;
            var valid = true;
            var i = 0; 
            while (i<capacity && valid) {
                var addGrade = insertGradeValid(gradeArr[i].value, totalArr[i].value, i);
                var addWeight = insertWeightValid(weightArr[i].value, i);
                if ((addGrade != -1) && (addWeight != -1)) {
                    totalWeight = totalWeight + addWeight;    
                }
                else {
                    valid = false; // if input is invalid, stop the calculation
                }
                i++;
            }
            
            if (valid) {  // when all input are valid, calculate
                if (totalWeight == 0) {
                    alert("Please input some positive number in weight textbox.");
                }
                else {
                    w = (gradeDec[0]*weightNum[0] + gradeDec[1]*weightNum[1] + gradeDec[2]*weightNum[2] + gradeDec[3]*weightNum[3])/totalWeight;
                    w = +(w*100).toFixed(4); //accurate up to 4 digits decimal and drop unnecessary zero
                    resultNum = w;
                    result.innerHTML = w + " / 100";
                }
            }
            
        }
    });
    
    gradeArr[0].addEventListener("keyup", function() {
        updatePercentage(gradeArr[0].value, totalArr[0].value, percentArr[0]);
    });
    totalArr[0].addEventListener("keyup", function() {
        updatePercentage(gradeArr[0].value, totalArr[0].value, percentArr[0]);
    });
    gradeArr[1].addEventListener("keyup", function() {
        updatePercentage(gradeArr[1].value, totalArr[1].value, percentArr[1]);
    });
    totalArr[1].addEventListener("keyup", function() {
        updatePercentage(gradeArr[1].value, totalArr[1].value, percentArr[1]);
    });
    gradeArr[2].addEventListener("keyup", function() {
        updatePercentage(gradeArr[2].value, totalArr[2].value, percentArr[2]);
    });
    totalArr[2].addEventListener("keyup", function() {
        updatePercentage(gradeArr[2].value, totalArr[2].value, percentArr[2]);
    });
    gradeArr[3].addEventListener("keyup", function() {
        updatePercentage(gradeArr[3].value, totalArr[3].value, percentArr[3]);
    });
    totalArr[3].addEventListener("keyup", function() {
        updatePercentage(gradeArr[3].value, totalArr[3].value, percentArr[3]);
    });
    
    
    reset.addEventListener("click", function () {
       for (var i=0; i<capacity; i++) {
           weightArr[i].value = "";
           gradeArr[i].value = "";
           totalArr[i].value = "";
           percentArr[i].innerHTML = "";
           
           gradeDec[i] = 0;
           weightNum[i] = 0;
       }
        resultNum = -1; //reset into not yet calculated
        result.innerHTML = "<br>";
        grade.innerHTML = "<br>";
    });
    
    calculate.addEventListener("click", function() {
        if (resultNum==-1) {
            alert("Please calculate weighted or mean result first.");
        }
        else {
            
            if (resultNum>=92) {
                grade.innerHTML = "A+";
            }
            else if (resultNum>=87) {
                grade.innerHTML = "A";
            }
            else if (resultNum>=82) {
                grade.innerHTML = "A-";
            }
            else if (resultNum>=78) {
                grade.innerHTML = "B+";
            }
            else if (resultNum>=74) {
                grade.innerHTML = "B";
            }
            else if (resultNum>=70) {
                grade.innerHTML = "B-";
            }
            else if (resultNum>=65) {
                grade.innerHTML = "C+";
            }
            else if (resultNum>=60) {
                grade.innerHTML = "C";
            }
            else if (resultNum>=55) {
                grade.innerHTML = "C-";
            }
            else if (resultNum>=50) {
                grade.innerHTML = "D";
            }
            else {
                grade.innerHTML = "F";
            }
        }
    });
}