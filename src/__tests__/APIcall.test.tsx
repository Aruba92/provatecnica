//import APIcall from '@/utils/API';
import {APIPokemonService} from "../utils/API";
import React, { useState, useEffect } from 'react';
import Pokemon from "../../public/types/Pokemon";

const [data, setData] = useState<Pokemon[]>([]);
const ApiCall = new APIPokemonService();

test('Check the API call url', () => {
    expect(ApiCall.APIcallLimit(setData, "?limit=160")).toBe(data);
  });