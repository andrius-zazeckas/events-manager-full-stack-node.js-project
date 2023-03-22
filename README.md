# final-full-stack-with-node.js-project

## Baigiamasis projektas

Šios projekto metu reikės sukurti programą naudojant React, NodeJS Express ir MongoDB arba MySQL. Programos tikslas - leisti renginių organizavimu užsiimančiai įmonei, registruoti telefonu paskambinusius asmenis į renginį. 


Renginių organizatorius, prisijungęs prie programos, matys: 
 * Registracijos formą, kurioje: 

   * vardas ir pavardė;

   * renginys (vienas iš pasirinkimų, o ne textarea);

   * el.paštas;

   * amžius;

   * gimimo data.

 * Renginių sąrašą bei paspaudęs ant renginio pamatys registruotų vartotojų sąrašą.

 * Bendrą užsiregistravusių vartotojų sąrašą (nurodoma lentelė su vartotojo vardu ir pavarde, el. paštu, gimimo data, renginio pavadinimu, administravimo mygtukais).


 * Galimybę atsijungti - šiems atvejams atskiri endpointai ir vaizdai (angl. routes/endpoints bei views).

## Funkcionalumas:

  a. CRUD operacijos (pvz.: registracijos formoje galima sukurti vartotoją, lentelėje matyti, atnaujinti ir ištrinti vartotojus);

  b. Duomenų saugojimas (vartotojai saugomi duomenų bazėje). Jeigu naudojate MySQL duomenų bazę būtina sukurti sąryšius tarp lentelių ir naudoti "Primary Key" apribojimus.

  c. Saugus duomenų talpinimas bei prisijungimas.

  d. Dizainas, kurį sukursite patys. Rekomenduotina naudoti Material UI bei Material Design, tačiau leistini ir kiti sprendimai.

  e. Stabilumas. Rekomenduotina naudoti Jest arba react-testing-library bei TypeScript.




#### Papildomas akcentas semantikai bei prieinamumui (angl. accessibility).



Užduoties įkėlimo instrukcijos

Instrukcijas, kaip valdyti GitHub repozitorijas rasite - https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories arba step-by-step žemiau.

1. Sukurti GitHub repozitoriją.

Instrukcijas, kaip susikurti GitHub repozitoriją rasite - https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

2. Pakeitimus daryti atskiroje šakoje (pvz. dev), kad būtų galima sukurti Pull Request.

Kaip galima sukurti Pull Request galite sužinoti čia - https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

Naują šaką galima susikurti įvykdžius `git checkout -b dev` komandą terminale.

3. Kuriant sistemą pakeitimus nuolatos saugoti su pakeitimus su prasmingomis "commit" žinutėmis.

4. Pabaigus projektą patikrinti ar visi pakeitimai yra nusiųsti į GitHub, sukurti Pull Request per GitHub puslapį į pagrindinę šaką (`main` arba `master`) ir pateikti nuorodą šiame "assignment".

Jeigu to padaryti nepavyks galite tiesiog įkelti archyvuotus failus.

Sėkmės!
