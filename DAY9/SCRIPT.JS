
        let a=document.getElementById('valuea');
        let b=6;
        let h=2;
        let option='square';
        let result;
        if(option == 'square'){
            result = AreaSquare(a);
        }else if(option == 'triangle'){
            result = AreaTriangle(b,h);
        }else if(option == 'rectangle'){
            result = AreaRectangle(a,b);
        }else if(option == 'circle'){
            result = AreaCircle(a);
        }else{
            console.log("Invalid option");
        }
        //creating the fxns//

        function AreaSquare(side){
            return side*side;
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

        console.log("Calculated Area:",result);
        document.getElementById('demo').innerText = "Result:" + result;
