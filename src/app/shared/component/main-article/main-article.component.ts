import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-article',
  templateUrl: './main-article.component.html',
  styleUrls: ['./main-article.component.scss'],
  standalone: false
})
export class MainArticleComponent {
  @Input() title!: string;
  @Input() description!: string | null;
  @Input() image!: string | null;
  @Input() sourceName!: string | null;
}
