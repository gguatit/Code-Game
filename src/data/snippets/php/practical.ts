export const snippets = [
  "function chargeCard(Order $order): Result\n{\n    $gateway = Gateway::create($_ENV['PAYMENT_KEY']);\n\n    try {\n        return $gateway->charge($order->total, $order->currency);\n    } catch (PaymentError $e) {\n        logger()->error('payment failed', ['order' => $order->id]);\n        return Result::failure($e);\n    }\n}",
  "$report = collect($orders)\n    ->groupBy(fn ($o) => $o->created_at->format('Y-m-d'))\n    ->map(fn ($group) => $group->sum('total'))\n    ->sortDesc();",
];
