import { async } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  beforeEach(async(()=>{
    component = new LoaderComponent();
  }))
  it('input recibido',async(()=>{
    expect(component.show).toBe(false)
  }))
});
