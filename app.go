package main

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Counter struct {
	Value int `json:"value"`
}

// App struct
type App struct {
	ctx     context.Context
	counter *Counter
}

// NewApp creates a new App application struct
func NewApp() *App {
	app := &App{}
	app.counter = &Counter{
		Value: 0,
	}
	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetCounter() *Counter {
	return a.counter
}

func (a *App) Increment() {
	a.counter.Value++
	runtime.EventsEmit(a.ctx, "counter", a.counter)
}
