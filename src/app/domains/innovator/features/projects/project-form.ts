import { httpResource } from '@angular/common/http';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IApiSuccess, IProject, IProjectPayloadInput } from '@/app/shared/interfaces';
import { MarketplaceCatalogStore } from '@/app/shared/data-access';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { InnovatorStore } from '../../data-access';

interface IProjectFormModel {
  status: 'DRAFT' | 'SUBMITTED';
  title: string;
  problemSolved: string;
  solution: string;
  sectors: string[];
  capabilities: string[];
  stage: string;
  publicationConsent: 'NAMED' | 'ANONYMOUS' | 'NO' | 'DISCUSS';
}

const defaultProjectModel = (): IProjectFormModel => ({
  status: 'DRAFT',
  title: '',
  problemSolved: '',
  solution: '',
  sectors: [],
  capabilities: [],
  stage: '',
  publicationConsent: 'DISCUSS'
});

@Component({
  templateUrl: './project-form.html',
  providers: [InnovatorStore],
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, Message]
})
export default class ProjectForm implements OnInit {
  readonly id = input<string | undefined>();

  protected readonly store = inject(InnovatorStore);
  protected readonly catalogStore = inject(MarketplaceCatalogStore);
  private readonly router = inject(Router);

  protected readonly projectResource = httpResource<IApiSuccess<IProject>>(() => {
    const projectId = this.id();
    return projectId && projectId !== 'nouveau' ? `/me/projects/${encodeURIComponent(projectId)}` : undefined;
  });

  protected readonly model = signal<IProjectFormModel>(defaultProjectModel());
  protected readonly projectForm = form(this.model, (schemaPath) => {
    required(schemaPath.title);
    required(schemaPath.problemSolved);
    required(schemaPath.solution);
  });

  protected readonly isNew = () => !this.id() || this.id() === 'nouveau';

  constructor() {
    effect(() => {
      if (this.projectResource.hasValue()) {
        const project = this.projectResource.value().data;
        this.model.set({
          status: project.status,
          title: project.title,
          problemSolved: project.problemSolved,
          solution: project.solution,
          sectors: [...project.sectors],
          capabilities: [...project.capabilities],
          stage: project.stage,
          publicationConsent: project.publicationConsent
        });
      }
    });

    let revision = 0;
    effect(() => {
      if (this.store.revision() > revision) {
        revision = this.store.revision();
        if (this.isNew()) {
          void this.router.navigate(['/innovateur/projets']);
        } else {
          this.projectResource.reload();
        }
      }
    });
  }

  ngOnInit(): void {
    this.catalogStore.load().subscribe();
  }

  protected save(asSubmitted = false): void {
    submit(this.projectForm, async () => {
      const value = this.model();
      const body: IProjectPayloadInput = {
        status: asSubmitted ? 'SUBMITTED' : value.status,
        title: value.title,
        problemSolved: value.problemSolved,
        solution: value.solution,
        sectors: value.sectors,
        capabilities: value.capabilities,
        stage: value.stage,
        publicationConsent: value.publicationConsent
      };

      if (this.isNew()) {
        this.store.createProject(body);
      } else {
        this.store.saveProject({ id: this.id()!, payload: body });
      }
    });
  }
}
