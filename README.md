# Zustand Deep-Dive / Learnings

Diese drei Dinge musst du kennen, wenn du [Zustand](https://github.com/pmndrs/zustand) erfolgreich einsetzen willst.

In einem produktiven Projekt haben wir kürzlich Zustand eingesetzt. Ich finde, es hat sich absolut gelohnt und werde es gerne wieder tun. Ich bin aber über drei Dinge gestolpert, die ich gerne vorher gewusst hätte.

Zur Demonstration habe ich einige Commits gemacht, die du per Git Tags erreichen kannst.

## Rerendering

Die folgende Art, einen Counter aus dem Zustand zuzuweisen sieht erst mal gut aus. Schliesslich ähnelt es der Verwendung von `useState`:

```
const {counter} = myZustand()
```

Problematisch ist aber, dass damit viel zu oft gerendert wird. React hat erst mit folgender Zuweisung die Chance, eine Komponente nur dann zu rendern, wenn sie sich geändert hat. Ansonsten wird bei jeder Änderung des Zustands ein rerendering fällig.

```
const counter = myZustand(state => state.counter)
```

## Persistieren

Zustand kann ganz einfach Daten in den `LocalStorage` persistieren.

```
{ name: 'my-zustand', getStorage: () => localStorage }
```

Das funktioniert für Objekte, die aus `String` und `Number` bestehen auch wunderbar. Wenn du aber ein `Date` persistieren willst, gibt es Probleme.

```
{
  name: 'my-zustand',
  getStorage: () => localStorage,
  deserialize: (str) => {
    const json = JSON.parse(str)
    console.log(json)
    return {
      state: { ...json.state, date: new Date(json.state.date) },
      version: json.version,
    }
  },
}
```

## Migration

Nun ist der Zustand im `LocalStorage` und wird das auch beim nächsten Besuch der App bleiben. Auch wenn die App inzwischen ganz anders aussieht und von einem ganz anderen Zustand ausgeht. Dafür gibt es die **Version** und die **Migration**. Du hast zwei Möglichkeiten:

1. Wenn du eine nicht kompatible Änderung machst, kannst du die **Version** des Zustands erhöhen. Der Zustand wird dann einfach weggeworfen, wenn die Version der App nicht mit der Version des `LocalStorage` übereinstimmt.

2. Du kannst nebst der Version noch einen **Migrations-Schritt** implementieren, der die Daten vom `LocalStorage` nimmt und in ein kompatibles Schema überführt.

Mehr dazu findest du auf der [Dokumentation von Zustand](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#version).
