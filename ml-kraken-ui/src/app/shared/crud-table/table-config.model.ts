import { Observable } from 'rxjs';

export interface TableConfig {
  header: string;
  cols: {
    field: string;
    header: string;
    type: string;
    withFilter: boolean;
    sortable: boolean;
    icon: {
      class: string;
      style: { color: string };
      text: string;
      clickable: boolean;
    };
  }[];
  buttons:
    {
      label: string;
      class: string;
      callback: () => void;
      icon: string;
      disabled: boolean;
    }[];
  withGlobalFilter: boolean;
  errors: {
    load: string;
  };
  paging: boolean;
  emptyMessage: string;
  subscriber: Observable<any>;
  globalFF: string[];
}
