import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { MessageService } from '../message.service'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {

  // heroes = HEROES;
  selectedHero?: Hero;
  heroes: Hero[] = [];
  
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  onSelect (hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }
  
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

}

