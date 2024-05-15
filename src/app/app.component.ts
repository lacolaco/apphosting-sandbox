import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <p>User: {{ user().name }}</p>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = "apphosting-sandbox";

  user = signal({ name: "John Doe" });

  #httpClient = inject(HttpClient);

  ngOnInit() {
    this.#httpClient
      .get<{ name: string }>("https://jsonplaceholder.typicode.com/users/1")
      .subscribe((user) => {
        this.user.set(user);
      });
  }
}
