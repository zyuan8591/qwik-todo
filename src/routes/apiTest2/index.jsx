import {
  component$,
  useClientEffect$,
  useStylesScoped$,
  $,
} from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import style from './apiTest2.scss?inline';
import axios from 'axios';
import Button from '@/components/bmsSample/button';

export default component$(() => {
  useStylesScoped$(style);
  const nav = useNavigate();

  useClientEffect$(
    async () => {
      try {
        const res = await axios.get('/stock/');
        console.log(res.data);
      } catch (e) {
        console.error(e);
      }
    },
    { eagerness: 'idle' }
  );

  const backToIndex = $(() => {
    nav.path = 'http://bms-backstage.app.local/todo/1';
  });

  return (
    <div>
      <Button buttonWord="回到首頁" buttonStyle="blue" onClick$={backToIndex} />
    </div>
  );
});
