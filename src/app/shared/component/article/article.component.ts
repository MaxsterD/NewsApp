import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: false
})
export class ArticleComponent {

  @Input() title!: string;
  @Input() image!: string | null;
  @Input() sourceName!: string;
  @Input() description!: string | null;
  @Input() url!: string;

}
