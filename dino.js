
class Obstacle{
  radius = 50;
  velx = 10
  constructor(x,y)
  {
      this.x = x;
      this.y = y;
     

  }
  render()
  {
     ellipse(this.x,this.y,this.radius,this.radius);
  }
  move()
  {
      this.x += this.velx ;
  }
  check()
  {
      if(this.x > width - this.radius || this.x + this.radius < 0 )
      {
          this.velx *= -1;
      }
      
  }
}
class Dino{
    radius = 30;
    constructor(x,y,chrom)
    {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.chromosome = chrom;
       
        this.fitness = 0;
        this.crashed = false;
        this.reached = false;
        this.time = lifespan;
        // this.velx = velx;
        // this.vely = vely;
    }
    render()
    {
      push();
      //color customization of rockets
      noStroke();
      fill(255, 150);
      //translate to the postion of rocket
      translate(this.pos.x, this.pos.y);
      //rotatates to the angle the rocket is pointing
      rotate(this.vel.heading());
      //creates a rectangle shape for rocket
      rectMode(CENTER);
      rect(0, 0, 30, 10);
      pop();
        // alert(num);
    }
    move(obs)
    { 
      var string = this.chromosome;
      if(dist(this.pos.x,this.pos.y,end_x,end_y)<30)
      {
        console.log('done');
        this.reached = true;
      }
      if (
        this.pos.x > rx &&
        this.pos.x < rx + rw &&
        this.pos.y > ry &&
        this.pos.y < ry + rh
      ) {
        console.log('crashed');
          this.time = count;
        this.crashed = true;
      }
      var k;
      // for(k in obstacle_arr)
      // {
      //   if(dist(this.pos.x,this.pos.y,obstacle_arr[k].x,obstacle_arr[k].y)<obstacle_arr[k].radius)
      //   {
      //     console.log('crashed');
      //     this.time = count;
      //     this.crashed = true;
      //   }
      // }
   
      if(this.pos.x<0 || this.pos.x>width || this.pos.y > height)
      {
        console.log('crashed');
        this.time = count;
        this.crashed = true;
      }
       //s background(100);
        // if(string[count] == '0')
        //   {
        //     this.x += 5;
        //   }
        // else if(string[count] == '1')
        //   {
        //     this.y -= 5;
        //   }
        // else if(string[count] == '2')
        //   {
        //     this.x -= 5;
        //   }
        // else if(string[count] == '3')
        //   {
        //     // if(this.y <= 0)
        //     // {

        //     //   this.fit = 10000;
              
        //     // }
        //     this.y += 5;
        //   }
        this.acc.add(string[count])
        this.vel.add(this.acc);
        this.vel.limit(6);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    call_fitness()
    {
           var d   = dist(this.pos.x,this.pos.y,end_x,end_y);
          
           this.fitness = map(d, 0, maxD, width *10, 0);

           if (this.reached) {
            this.fitness *= 10000;
          }
          // If rocket does not get to target decrease fitness
          if (this.crashed) {
            this.fitness /= 100;
          }
          this.fitness *= this.time*10;
          console.log(this.fitness);
           return this.fitness;

        
    }

    // mating creating a child chromosome if a cut point then stich two 
    mate(other)
    {
        var child_chromosome = [];
       
         var min_length = min(this.chromosome.length,other.chromosome.length);
         var cut_point = Math.floor(Math.random()*min_length);
        for(var j = 0;j<lifespan;j++)
        {
          if(Math.random() <= 0.1)
          {
           child_chromosome[j] = p5.Vector.random2D().setMag(0.2);
 
          }
          else if(j<cut_point){
           child_chromosome[j] = this.chromosome[j];
          }
          else{
            child_chromosome[j] = other.chromosome[j];
           }
           
        }
       
        
          
        
        // child_chromosome.push(this.chromosome.slice(0,100));
        // child_chromosome.push(other.chromosome.slice(cut_point));

        // mutation : randomly add 0,1,2,3
        //  if(Math.random() <= 0.4)
        //  {
        //     if(Math.random() <= 0.25)
        //     {
        //      child_chromosome += '0';
        //     }
        //     else if(Math.random() <= 0.5){
        //       child_chromosome += '1';
        //     }
        //     else if(Math.random() <= 0.75){
        //       child_chromosome += '2';
        //     }
        //     else{
        //       child_chromosome += '3';
        //     }
        //  }
  
            return new Dino(start_x,start_y,child_chromosome);
    }
}