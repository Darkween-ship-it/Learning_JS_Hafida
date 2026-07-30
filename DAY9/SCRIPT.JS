
        let a=8;
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
        }else if(option == 'trapezium'){
            result = AreaTrapezium(a,b,h);
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
        function AreaTrapezium(base1,base2,height){
            return((base1 + base2) / 2)*height;
        }

        console.log("Calculated Area:",result);
        document.getElementById('demo').innerText = "Result:" + result;
