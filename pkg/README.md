# Grafana backend codebase

The code should follow the [Backend style guide](/contribute/style-guides/backend.md).

Refer to [architecture](ARCHITECTURE.md) for a description of the backend codebase architecture.

## Ongoing refactoring

These issues are not something we want to address all at once but something we will improve incrementally. Since Grafana is released at a regular schedule the preferred approach is to do this in batches. Not only is it easier to review, but it also reduces the risk of conflicts when cherry-picking fixes from master to release branches. Please try to submit changes that span multiple locations at the end of the release cycle. We prefer to wait until the end because we make fewer patch releases at the end of the release cycle, so there are fewer opportunities for complications.

## Global state

Global state makes testing and debugging software harder and it's something we want to avoid when possible. Unfortunately, there is quite a lot of global state in Grafana. 

We want to migrate away from this by using the `inject` package to wire up all dependencies either in `pkg/cmd/grafana-server/main.go` or self-registering using `registry.RegisterService` ex https://github.com/grafana/grafana/blob/master/pkg/services/cleanup/cleanup.go#L25.

## Limit the use of the init() function

Only use the init() function to register services/implementations.

## Settings refactoring

The plan is to move all settings to from package level vars in settings package to the [setting.Cfg](https://github.com/grafana/grafana/blob/df917663e6f358a076ed3daa9b199412e95c11f4/pkg/setting/setting.go#L210) struct. To access the settings, services and components can inject this setting.Cfg struct:

[Cfg struct](https://github.com/grafana/grafana/blob/df917663e6f358a076ed3daa9b199412e95c11f4/pkg/setting/setting.go#L210)
[Injection example](https://github.com/grafana/grafana/blob/df917663e6f358a076ed3daa9b199412e95c11f4/pkg/services/cleanup/cleanup.go#L20)

## Reduce the use of GoConvey

We want to migrate away from using GoConvey. Instead, we want to use stdlib testing, because it's the most common approach in the Go community and we think it will be easier for new contributors. Read more about how we want to write tests in [ARCHITECTURE.MD](ARCHITECTURE.md#Testing).

## Refactor SqlStore

The `sqlstore` handlers all use a global xorm engine variable. Refactor them to use the `SqlStore` instance.

## Avoid global HTTP handler functions

Refactor HTTP handlers so that the handler methods are on the HttpServer instance or a more detailed handler struct. E.g (AuthHandler). This ensures they get access to HttpServer service dependencies (and Cfg object) and can avoid global state.

## Date comparison

Store newly introduced date columns in the database as epochs if they require date comparison. This permits a unified approach for comparing dates against all the supported databases instead of handling dates differently for each database. Also, by comparing epochs, we no longer need error pruning transformations to and from other time zones.

## Dependency management

Refer to [UPGRADING_DEPENDENCIES.md](https://github.com/grafana/grafana/blob/master/UPGRADING_DEPENDENCIES.md).