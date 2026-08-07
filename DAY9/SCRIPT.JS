
        function AreaSquare(side){
            result = side*side;
            return result;
        }
        function AreaTriangle(base,height){
            return 0.5*base*height;
        }
        function AreaRectangle(lenght,width){
            return lenght*width;
        }
        function AreaCircle(radius){
            return (22/7)*radius*radius;
        }
        

        //variables of each fxn//
        function calculateSquare(){
            let a = parseFloat(document.getElementById('valuea').value);
            if(isNaN(a))return showResult("Please enter a valid number");

            showResult("Result:"+AreaSquare(a));
        }

        function calculateTriangle(){
            let b = parseFloat(document.getElementById('valueb').value);
            let h = parseFloat(document.getElementById('valueh').value);
            if(isNaN(b) || isNaN(h)) return showResult("Pleae enter a vaild number");

            showResult("Result:"+AreaTriangle(b,h));
        }

        function calculateRectangle(){
            let l = parseFloat(document.getElementById('valuel').value);
            let w = parseFloat(document.getElementById('valuew').value);
            if(isNaN(l) || isNaN(w)) return showResult("Pleae enter a vaild number");

            showResult("Result:"+AreaRectangle(l,w));
        }

        function calculateCircle(){
            let r = parseFloat(document.getElementById('valuer').value);
            if(isNaN(r)) return showResult("Pleae enter a vaild number");

            showResult("Result:"+AreaCircle(r));
        }

        function showResult(message){
            document.getElementById('demo').innerText = message;
        }
