// starting and ending position of player
start_x = 300;
start_y = 600;
end_x   = 600;
end_y   = 30;

count = 1;
var maxD ;
var lifespan = 400;

// obstacles x,y,width,height
var rx = 150;
var ry = 250;
var rw = 500;
var rh = 100;
var obstacle1;
obstacle_arr = [];

// number of players at once
population_size = 200;

// players
population = [];

// generation
var generation = 0;
var num_gen = 50;


function setup()
{
  maxD = dist(start_x,start_y,end_x,end_y);
  frameRate(200);
  createCanvas(600, 600);
  background(100);
  // obstacle_arr.push(new Obstacle(width/2,height/2))
  // obstacle_arr.push(new Obstacle(width/2,height/4))
  // obstacle_arr.push(new Obstacle(width/2,3*height/4))


  // console.log(obstacle_arr);

 

  

  // to create intial random population
  for(var x = 0;x < population_size;x++)
  {
      gnome = create();
      population[x] = new Dino(start_x,start_y,gnome);

  }
  console.log("initial",population);
  
  

}

function create()
{
    // create random chromosome for intial population 
    result = []
    for(var j = 0;j < lifespan; j++)
      {
      
        result.push(p5.Vector.random2D().setMag(0.2));
  
      }
    // console.log(result);
    return result;

    }

    var new_gen = [];

function matepool()
{
  var maxfit = 0;
  final = [];
  population.sort((a,b) => -(a.call_fitness() - b.call_fitness()))
  for(var j = 0;j<population_size*0.1;j++)
  {
      final.push(new Dino(start_x,start_y,population[j].chromosome));
  }
  console.log(population);
    // Iterate through all players and calcultes their fitness
    for (var i = 0; i < population_size; i++) {
      // Calculates fitness
      population[i].call_fitness();
      // If current fitness is greater than max, then make max equal to current
      if (population[i].fitness > maxfit) {
        maxfit = population[i].fitness;
      }
    }

    for (var i = 0; i < population_size; i++) {
      population[i].fitness /= maxfit;
    }
  matingpool = [];
  for (var i = 0; i < population_size; i++) {
    var n = population[i].fitness * 100;
    for (var j = 0; j < n; j++) {
      matingpool.push(population[i]);
    }
  }
  console.log(matingpool);

  if(new_gen.length>1)
  {
    text(new_gen[population_size/2 -1].call_fitness(), width/2, 70);
  }
  
  //final = new_gen.slice(0,population_size*0.1);
  for(var l = 0;l < population_size *0.9 ; l++)
  {
      y = matingpool[Math.floor(Math.random() * (matingpool.length-1))];
      z = matingpool[Math.floor(Math.random() * (matingpool.length-1))];
      console.log(y,z);
      child = y.mate(z);
      final.push(child);
  }
  console.log(final);
  return final;
}

    

function draw()
{
    background(100);
    textSize(32);
    text(count, width/2, 40);
    fill(255);
  
    
  rect(rx, ry, rw, rh);
    for(var z = 0;z<population_size;z++)
    {

      if(!population[z].crashed)
      {
        population[z].move();

      }
      population[z].render();

    }
    count += 1;

    if(count == lifespan)
    {
      population = matepool();
      count = 1;
    }

}