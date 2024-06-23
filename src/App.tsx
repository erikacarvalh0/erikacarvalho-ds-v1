import React, { useRef, useState } from "react";
import { createRoot } from 'react-dom/client';

import { Header } from "./organisms/Header";
import { headerContent, headerLinks } from "./data/example/header";
import { Dialog } from "./molecules/Dialog";
import { dialogErrorContent, dialogSuccessContent } from "./data/example/dialog";
import { Button } from "./atoms/Button";
import { Input } from "./atoms/Input";
import { Textarea } from "./atoms/TextArea";
import { Select } from "./atoms/Select";
import { Img } from "./atoms/Img";
import { Card } from "./atoms/Card";
import { Accordion } from "./atoms/Accordion";
import { TabItem, Tabs } from "./atoms/Tabs";
import { Form } from "./molecules/Form";
import { iObject } from "./interfaces/atoms";
import { Table } from "./molecules/Table";
import { TCol } from "./molecules/Table/TCol";
import { Carousel, CItem } from "./atoms/Carousel";
import { Video } from "./molecules/Video";
import { Audio } from "./molecules/Audio";
import { Notes } from "./molecules/Notes";
import { Chart } from "./atoms/Chart";
import { tableData } from "./data/example/table";
import { chartConfig, chartData, pieData } from "./data/example/chart";
import { carouselConfig } from "./data/example/carousel";

import "./index.scss"

const App = () => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const toggleSuccess = () => setIsSuccessOpen(!isSuccessOpen)
  const toggleError = () => setIsErrorOpen(!isErrorOpen)
  const handleFormSubmit = (values: iObject) => console.log('handle submit', values)
  const notesRef = useRef(null)

  return (<div className="container">
    <Header title="Sobre o Projeto" content={headerContent} links={headerLinks} />

    <Tabs>
      <TabItem title="Column chart">
        <Chart title="Gráfico de pizza" data={pieData} config={{type: 'pie'}} />
        <Chart title="Gráfico de barras" data={chartData} config={chartConfig} />
        <Chart title="Gráfico de colunas" data={chartData} config={{...chartConfig, type: 'column'}} />
      </TabItem>
      <TabItem title="Table">
        <Table data={tableData(toggleSuccess)}>
          <TCol id="1" sort>Test 1</TCol>
          <TCol id="2">Test 2</TCol>
          <TCol id="3">Test 3</TCol>
          <TCol id="4" sort>Test 4</TCol>
          <TCol id="5">Test 5</TCol>
          <TCol id="6">Test 6</TCol>
          <TCol id="7">Test 7</TCol>
        </Table>
      </TabItem>
      <TabItem title="Notes">
        <Notes notesRef={notesRef} />
        <p ref={notesRef}>CD red lipstick Speak Now the 1 Taylor Marjorie rollout indie album I kept you like an oath i had a marvelous time ruining everything back catalogue Red Cardigan All Too Well red lipstick Blank Space vocalist James bonus director squad cats august Shake it Off blondie cats presale Red easter egg (Taylor's Version) vocalist Long Pong Sessions 13 Target Exclusive Grammy songwriter Taylah artist co-writer stadium vocals record producer stadium single cats song snow on the beach masters 3am All Too Well farm Fearless vocals signer All Too Well country karma is a cat Cats songwriter artist Taylor Our Song queue New York bonus businesswoman Taylor album of the year merch my tears ricochet Target Exclusive vinyl Tim McGraw (Taylor's Version) red lipstick era the last great american dynasty Grammy era clock Blank Space stadium All Too Well quill I knew you were trouble Our Song Delicate i had a marvelous time ruining everything Grammy karma is a cat clock Swift Lover Fest Red quill 1989 fountain pen Grammy glitter gel pen refrigerator light album tour Anti-Hero exile vocalist Hot 100 New York Grammy [From the Vault] music video reputation 3am reputation blondie 13 producer (Taylor's Version) rollout cottagecore New York Shake it Off stadium casette swiftie I knew you were trouble album (Taylor's Version) 13 piano Long Pong Sessions (Taylor's Version) Target Exclusive Selena Gomez I swear I don't love the drama, it loves me easter egg solo 13 Midnight Rain masters London James Grammy stadium fans Target Exclusive exile vocals merch Selena Gomez Lover Fest Shake it Off (10 Minute Version) artist Midnights refrigerator light Jack Antonoff Anti-Hero fans [From the Vault] vocals album Marjorie re-record quill Elvira I swear I don't love the drama, it loves me squad fame evermore soft Woulda Shoulda Coulda cottagecore Grammy tracklist 3am Nashville London Blank Space sexy baby Our Song guitar debut vocalist piano I swear I don't love the drama, it loves me co-writer style soft 22 album producer Hot 100 bonus tracklist Grammy All Too Well vocalist refrigerator light you need to calm down folk Elvira stained glass windows in my mind easter egg Joe tracklist London song vocals fountain pen music video Long Pong Sessions Jack Antonoff Taylah vocals queue [From the Vault] fame Our Song tour Elvira back catalogue 22 you need to calm down easter egg All Too Well Grammy fame folk i had a marvelous time ruining everything Midnights fountain pen deluxe Lover Fest I knew you were trouble song 3am blondie Willow album exile London remix Delicate cats Grammy Willow producer style here's how Cruel Summer can still be a single Haim Swift Eras Tour Lover blondie farm guitar quill the last great american dynasty Grammy surprise vinyl Swift red lipstick Delicate song evermore the last great american dynasty karma is a cat song vocals song rollout Our Song stadium glitter gel pen fuck the patriarchy Eras Tour Taylor Cardigan vinyl tracklist James record Jack Antonoff style All Too Well betty rollout I knew you were trouble fuck the patriarchy squad I kept you like an oath tour song Our Song the last great american dynasty [From the Vault] Joe</p>
      </TabItem>
      <TabItem title="Audio">
        <Audio theme="highlight" src="/audios/example.ogg" forward download title="Example audio" rewind />
      </TabItem>
      <TabItem title="Video">
        <Video theme="highlight" src="/videos/example.mp4" forward fullScreen download title="Example video" rewind />
      </TabItem>
      <TabItem title="Carousel">
        <Carousel config={carouselConfig}>
          <CItem>Content 1</CItem>
          <CItem>Content 2<Img src="/images/test.png" /></CItem>
          <CItem>Content 3</CItem>
          <CItem>Content 4<Img src="/images/test.png" /></CItem>
          <CItem>Content 5</CItem>
          <CItem>Content 6<Img src="/images/test.png" /></CItem>
          <CItem>Content 7</CItem>
          <CItem>Content 8<Img src="/images/test.png" /></CItem>
          <CItem>Content 9</CItem>
        </Carousel>
      </TabItem>
      <TabItem title="Form">
        <Form handleSubmit={handleFormSubmit} buttonText="Login">
          <Input isRequired type="email" name="email-login" label="E-mail" />
          <Input isRequired type="password" name="password-login" label="Senha" />
        </Form>
      </TabItem>
      <TabItem title="Accordion">
        <Accordion title="Taylorem Ipswift" hasArrow acqua>
          <p>CD red lipstick Speak Now the 1 Taylor Marjorie rollout indie album I kept you like an oath i had a marvelous time ruining everything back catalogue Red Cardigan All Too Well red lipstick Blank Space vocalist James bonus director squad cats august Shake it Off blondie cats presale Red easter egg (Taylor's Version) vocalist Long Pong Sessions 13 Target Exclusive Grammy songwriter Taylah artist co-writer stadium vocals record producer stadium single cats song snow on the beach masters 3am All Too Well farm Fearless vocals signer All Too Well country karma is a cat Cats songwriter artist Taylor Our Song queue New York bonus businesswoman Taylor album of the year merch my tears ricochet Target Exclusive vinyl Tim McGraw (Taylor's Version) red lipstick era the last great american dynasty Grammy era clock Blank Space stadium All Too Well quill I knew you were trouble Our Song Delicate i had a marvelous time ruining everything Grammy karma is a cat clock Swift Lover Fest Red quill 1989 fountain pen Grammy glitter gel pen refrigerator light album tour Anti-Hero exile vocalist Hot 100 New York Grammy [From the Vault] music video reputation 3am reputation blondie 13 producer (Taylor's Version) rollout cottagecore New York Shake it Off stadium casette swiftie I knew you were trouble album (Taylor's Version) 13 piano Long Pong Sessions (Taylor's Version) Target Exclusive Selena Gomez I swear I don't love the drama, it loves me easter egg solo 13 Midnight Rain masters London James Grammy stadium fans Target Exclusive exile vocals merch Selena Gomez Lover Fest Shake it Off (10 Minute Version) artist Midnights refrigerator light Jack Antonoff Anti-Hero fans [From the Vault] vocals album Marjorie re-record quill Elvira I swear I don't love the drama, it loves me squad fame evermore soft Woulda Shoulda Coulda cottagecore Grammy tracklist 3am Nashville London Blank Space sexy baby Our Song guitar debut vocalist piano I swear I don't love the drama, it loves me co-writer style soft 22 album producer Hot 100 bonus tracklist Grammy All Too Well vocalist refrigerator light you need to calm down folk Elvira stained glass windows in my mind easter egg Joe tracklist London song vocals fountain pen music video Long Pong Sessions Jack Antonoff Taylah vocals queue [From the Vault] fame Our Song tour Elvira back catalogue 22 you need to calm down easter egg All Too Well Grammy fame folk i had a marvelous time ruining everything Midnights fountain pen deluxe Lover Fest I knew you were trouble song 3am blondie Willow album exile London remix Delicate cats Grammy Willow producer style here's how Cruel Summer can still be a single Haim Swift Eras Tour Lover blondie farm guitar quill the last great american dynasty Grammy surprise vinyl Swift red lipstick Delicate song evermore the last great american dynasty karma is a cat song vocals song rollout Our Song stadium glitter gel pen fuck the patriarchy Eras Tour Taylor Cardigan vinyl tracklist James record Jack Antonoff style All Too Well betty rollout I knew you were trouble fuck the patriarchy squad I kept you like an oath tour song Our Song the last great american dynasty [From the Vault] Joe</p>
        </Accordion>
      </TabItem>
      <TabItem title="Buttons with Dialogs">
        <Button theme="cta" text="Open Success" action={toggleSuccess} />
        <Button theme="cancel" text="Open Error" action={toggleError} />
        <Dialog 
          theme="success"
          isOpen={isSuccessOpen}
          toggleDialog={toggleSuccess}
          message={dialogSuccessContent}
        />
        <Dialog 
          theme="error"
          isOpen={isErrorOpen}
          toggleDialog={toggleError}
          content={[dialogErrorContent]}
          title="Não foi possível enviar a sua mensagem"
        />
      </TabItem>
      <TabItem title="Cards">
        <Card title="Lendo por aí" subtitle="O Retorno do Cangaceiro Javascript" text="Você aprenderá os conceitos da Programação Funcional por meio de exemplos práticos com a criação da nossa própria biblioteca e operadores. Para completar, o autor traz os padrões de projeto mais utilizados para você melhorar ainda mais seus projetos." />
        <Card 
          title="Lendo por aí" 
          subtitle="O Retorno do Cangaceiro Javascript" 
          text="Você aprenderá os conceitos da Programação Funcional por meio de exemplos práticos com a criação da nossa própria biblioteca e operadores. Para completar, o autor traz os padrões de projeto mais utilizados para você melhorar ainda mais seus projetos."
          button={{
            action: () => console.log('click'),
            text: "Card button"
          }}
          img={{
            src:"/images/test.png",
            srcmobile:"/images/test-mobile.png",
            media: 768
          }}
        />
      </TabItem>
      <TabItem title="Images">
        <Img src="/images/test.png" />
        <Img src="/images/test.png"  srcmobile="/images/test-mobile.png" media={768} />
      </TabItem>
      <TabItem title="Form fields">
        <Select name="select" label="select" options={["Opt 1", "Opt 2", "Opt 3"]} />
        <Input type="text" name="name" label="Name" />
        <Input type="text" name="name-error" label="Name" fieldError={true} />
        <Input type="number" name="age" label="Age" />
        <Input type="email" name="email" label="E-mail" />
        <Input type="password" name="password" label="Senha" rules={[
          {
            rule: (value) => Array.from(value).find((character: string) => character == character.toUpperCase())
          }]} />

        <Input type="password" name="password" label="Senha" rules={[
          {
            text: "Mínimo 1 letra maiúscula",
            rule: (value) => Array.from(value).find((character: string) => character == character.toUpperCase())
          },
          {
            text: "Mínimo 1 letra minúscula",
            rule: (value) => Array.from(value).find((character: string) => character == character.toLowerCase())
          },
          {
            text: "Mínimo 1 caracter especial",
            rule: (value) => Array.from(value).find((character: string) => RegExp(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/).test(character))
          }
        ]} />
        <Textarea name="textarea" label="textarea" />
      </TabItem>
    </Tabs>
  </div>
)};

const container = document.getElementById("app")
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
