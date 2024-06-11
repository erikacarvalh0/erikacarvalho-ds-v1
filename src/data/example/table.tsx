import React from 'react'
import { Button } from "../../atoms/Button";
import { iFn } from '../../interfaces/atoms';

export const tableData =(toggleSuccess: iFn) => [
    {
      1: 1,
      2: "TEst 1",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'a',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 2,
      2: "TEst 2",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'b',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 3,
      2: "TEst 3",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'ca',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 4,
      2: "TEst 4",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'da',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 5,
      2: "TEst 5",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'ea',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 6,
      2: "TEst 6",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'fa',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 7,
      2: "TEst 7",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'g',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 8,
      2: "TEst 8",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'ha',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 9,
      2: "TEst 9",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'ia',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    {
      1: 10,
      2: "TEst 10",
      3: <Button theme="cta" text="Open Success" action={toggleSuccess} />,
      4: 'ga',
      5: '5',
      6: '6',
      7: 'seven seven seven'
    },
    
  ]