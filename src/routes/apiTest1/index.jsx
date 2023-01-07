import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
} from '@builder.io/qwik';
import style from './apiTest1.scss?inline';
import axios from 'axios';

export default component$(() => {
  useStylesScoped$(style);

  const resource = useResource$(async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(res.data);
    return res.data;
  });

  return (
    <div class="api-wrapper">
      <div class="title">Fake data</div>
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load weather</div>}
        onResolved={(data) => {
          return data.map((d) => (
            <div class="api-resource-container">
              <div class="api-id">{d.id}</div>
              <div class="api-title">{d.title}</div>
              <div class="api-body">{d.body}</div>
            </div>
          ));
        }}
      />
    </div>
  );
});
